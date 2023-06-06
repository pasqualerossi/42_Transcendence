import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Connection, Repository, Not, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

import { User } from './Users.Entity';
import DatabaseFilesService from 'src/Database/DatabaseFile.service';
import { UserFriendsSerialiser } from './Users.Serialiser';

@Injectable()
export class UsersService 
{
	constructor
	(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private readonly databaseFilesService: DatabaseFilesService,
		private connection: Connection,
	) {}
	
	// Find All Users

	async findAll(): Promise<User[]> 
	{
		return await this.usersRepository.find
		({
			relations: 
			[
				'chatRoom',
				'roomAdmin',
				'friends',
				'receivedFriendRequests',
				'sendFriendRequests',
				'bannedRooms',
				'blockedUsers',
				'blockedFromUsers',
				'roomMutedUsers',
				'roomMutedUsers.room',
				'matchHistory'
			]
		});
	}

	// Find User By ID

	async findById(id: number): Promise<User> 
	{
		return await this.usersRepository.findOne
		({
			where: {id: id},
			relations: 
			[
				'chatRoom',
				'roomAdmin',
				'friends',
				'receivedFriendRequests',
				'sendFriendRequests',
				'bannedRooms',
				'blockedUsers',
				'blockedFromUsers',
				'roomMutedUsers',
				'roomMutedUsers.room',
				'matchHistory'
			]
		});
	}

	// Find User By Login Name

	async findByLoginName(name: string): Promise<User> 
	{
		return await this.usersRepository.findOne({
			where: {loginName: name},
			relations: 
			[
				'chatRoom',
				'roomAdmin',
				'friends',
				'receivedFriendRequests',
				'sendFriendRequests',
				'bannedRooms',
				'blockedUsers',
				'blockedFromUsers',
				'roomMutedUsers',
				'roomMutedUsers.room',
				'matchHistory'
			]
		});
	}

	// Find User By Username

	async findByUserName(name: string): Promise<User> 
	{
		return await this.usersRepository.findOne({
			where: {username: name},
			relations: 
			[
				'chatRoom',
				'roomAdmin',
				'friends',
				'receivedFriendRequests',
				'sendFriendRequests',
				'bannedRooms',
				'blockedUsers',
				'blockedFromUsers',
				'roomMutedUsers',
				'roomMutedUsers.room',
				'matchHistory'
			]
		});
	}

	// Find All Users Except Yourself

	async findAllExceptMe(user: User): Promise<User[]> 
	{
		return await this.usersRepository.find
		({
			where: { id: Not(user.id) },
			relations: 
			[
				'chatRoom',
				'roomAdmin',
				'friends',
				'receivedFriendRequests',
				'sendFriendRequests',
				'bannedRooms',
				'blockedUsers',
				'blockedFromUsers',
				'roomMutedUsers',
				'roomMutedUsers.room',
				'matchHistory'
			]
		});
	}

	// Find All Users That Are Online

	async findAllOnlineUsers(): Promise<User[]> 
	{
		return await this.usersRepository.find
		({
			where: { status: 1 },
		});
	}

	// Create A User

	async create(newUser: User): Promise<User> 
	{
		const user: User | null = await this.usersRepository.findOne
		({
			where: 
			{
				loginName: newUser.loginName
			}
		});
		if (user)
			return user;
		newUser.avatarId = 1;
		this.usersRepository.create(newUser);
		return await this.usersRepository.save(newUser);
	}

	// Update Username

	async updateName(userId: number, newUserName: string): Promise<boolean> 
	{
		try 
		{
			await this.usersRepository.update({id: userId}, {username: newUserName})
			return true;
		}
		catch 
		{
			return false;
		}
	}

	// Delete User

	async delete(id: number) 
	{
		await this.usersRepository.delete(id);
	}

	// Turn On 2FA

	async turnOnTwoFactorAuthentication(userId: number) 
	{
		return this.usersRepository.createQueryBuilder()
		.update(User)
		.set({ isTwoFactorAuthenticationEnabled: true })
		.where("id = :userId", { userId })
		.execute()
	}

	// Turn Off 2FA

	async turnOffTwoFactorAuthentication(userId: number) 
	{
		return this.usersRepository.createQueryBuilder()
		.update(User)
		.set({ isTwoFactorAuthenticationEnabled: false })
		.where("id = :userId", { userId })
		.execute()
	}

	// Set 2FA Secret

	async setTwoFactorAuthenticationSecret(secret: string, userId: number) 
	{
		return this.usersRepository.createQueryBuilder()
		.update(User)
		.set({ twoFactorAuthenticationSecret: secret })
		.where("id = :userId", { userId })
		.execute()
	}

	// Set Current Token Refresh

	async setCurrentRefreshToken(refreshToken: string, userId: number) 
	{
		const HashedRefreshToken = await bcrypt.hash(refreshToken, 10);
		return this.usersRepository.createQueryBuilder()
		.update(User)
		.set({ currentHashedRefreshToken: HashedRefreshToken })
		.where("id = :userId", { userId })
		.execute()
	}

	// Remove Refresh Token

	async removeRefreshToken(userId: number) 
	{
		return this.usersRepository.createQueryBuilder()
		.update(User)
		.set({ currentHashedRefreshToken: null })
		.where("id = :userId", { userId })
		.execute()
	}

	// Add User Avatar

	async addAvatar(userId: number, imageBuffer: Buffer, filename: string) 
	{
		const queryRunner: QueryRunner = this.connection.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const user: User | null = await queryRunner.manager.findOne( User, 
				{
				where: 
				{
					id: userId
				}
			});
			if (!user)
				return ;
			const currentAvatarId = user.avatarId;

			const avatar = await this.databaseFilesService.uploadDatabaseFileWithQueryRunner(imageBuffer, filename, queryRunner);

			await queryRunner.manager.update(User, userId, 
			{
				avatarId: avatar.id
			});

			if (currentAvatarId != 1)
				await this.databaseFilesService.deleteFileWithQueryRunner(currentAvatarId, queryRunner);

			await queryRunner.commitTransaction();
			return avatar;
		} 
		catch 
		{
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException();
		} 
		finally 
		{
			await queryRunner.release();
		}
	}

	// Set User Status

	async setStatus(status: number, userId: number): Promise<User> 
	{
		// Status 0 = Offline
		// Status 1 = Online
		// Status 2 = Playing a Pong Game
		// Status 3 = Don't Distrub
		if (status < 0 || status > 3)
			throw new HttpException('Please enter a valid status', HttpStatus.CONFLICT);
		await this.usersRepository.update({id: userId}, {status: status})
		return await this.findById(userId);
	}

	// Send Friend Request

	async sendFriendReqeuest(userId: number, friendId: number): Promise<User> 
	{
		if (userId === friendId)
			throw new HttpException('Can not add yourself as a friend', HttpStatus.CONFLICT);
		const user: User | null = await this.findById(userId);
		if (!user)
			throw new HttpException('User does not exist', HttpStatus.CONFLICT);
		const friend: User | null = await this.findById(friendId);
		if (!friend)
			throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);

		if (user.friends.some(x => x.id === friend.id))
			throw new HttpException('Conflict: friend already in friendlist', HttpStatus.CONFLICT);

		if (user.sendFriendRequests.some(x => x.id === friend.id))
			throw new HttpException('Conflict: friend-request already sent', HttpStatus.CONFLICT);

		if (user.receivedFriendRequests.some(x => x.id === friend.id))
			return await this.acceptFriendReqeuest(userId, friendId);
		
		user.sendFriendRequests.push(plainToClass(UserFriendsSerialiser, friend));
	
		return await this.usersRepository.save(user);
	}

	// Remove A Friend

	async removeFriend(userId: number, friendId: number): Promise<User> 
	{
		const user: User | null = await this.findById(userId);
		if (!user)
			throw new HttpException('User does not exist', HttpStatus.CONFLICT);
		const friend: User | null = await this.findById(friendId);
		if (!friend)
			throw new HttpException('Conflict: no such friend', HttpStatus.CONFLICT);

		if (!user.friends.some(x => x.id === friend.id))
			throw new HttpException('Conflict: no such friend', HttpStatus.CONFLICT);

		friend.friends = friend.friends.filter(x => 
			{
			return x.id !== user.id;
		});
		await this.usersRepository.save(friend);

		user.friends = user.friends.filter(x => 
		{
			return x.id !== friend.id;
		});
		return await this.usersRepository.save(user);
	}

	// Accept Friend Request

	async acceptFriendReqeuest(userId: number, friendId: number): Promise<User> 
	{
		if (userId === friendId)
			throw new HttpException('Can not add yourself as a friend', HttpStatus.CONFLICT);
		const user: User | null = await this.findById(userId);
		if (!user)
			throw new HttpException('User does not exist', HttpStatus.CONFLICT);
		const friend: User | null = await this.findById(friendId);
		if (!friend)
			throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);

		if (user.receivedFriendRequests.some(x => x.id === friend.id) &&
		friend.sendFriendRequests.some(x => x.id === user.id)) 
		{
			user.receivedFriendRequests = user.receivedFriendRequests.filter(x => 
			{
				return x.id !== friend.id;
			});
			user.friends.push(plainToClass(UserFriendsSerialiser, friend));
			await this.usersRepository.save(user);
			
			friend.sendFriendRequests = friend.sendFriendRequests.filter(x => 
			{
				return x.id !== user.id;
			});
			friend.friends.push(plainToClass(UserFriendsSerialiser, user));
			return await this.usersRepository.save(friend);
		}
		else
			throw new HttpException('No such friend-request received', HttpStatus.NOT_FOUND);
	}

	// Decline A Friend Request

	async declineFriendReqeuest(userId: number, friendId: number): Promise<User> 
	{
		if (userId === friendId)
			throw new HttpException('Can not add yourself as a friend', HttpStatus.CONFLICT);
		const user: User | null = await this.findById(userId);
		if (!user)
			throw new HttpException('User does not exist', HttpStatus.CONFLICT);
		const friend: User | null = await this.findById(friendId);
		if (!friend)
			throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);
		if (user.receivedFriendRequests.some(x => x.id === friend.id) && friend.sendFriendRequests.some(x => x.id === user.id)) 
		{
			friend.sendFriendRequests = friend.sendFriendRequests.filter(x => 
			{
				return x.id !== user.id
			});
			await this.usersRepository.save(friend);
			
			user.receivedFriendRequests = user.receivedFriendRequests.filter(x => 
			{
				return x.id !== friend.id
			});
			return await this.usersRepository.save(user);
		}
		else
			throw new HttpException('No such friend-request received', HttpStatus.NOT_FOUND);
	}

	// View Friend Requests

	async retrieveFriendReqeuest(userId: number, friendId: number): Promise<User> 
	{
		if (userId === friendId)
			throw new HttpException('Can not add yourself as a friend', HttpStatus.CONFLICT);
		const user: User | null = await this.findById(userId);
		if (!user)
			throw new HttpException('User does not exist', HttpStatus.CONFLICT);
		const friend: User | null = await this.findById(friendId);
		if (!friend)
			throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);
		if (user.sendFriendRequests.some(x => x.id === friend.id) &&
		friend.receivedFriendRequests.some(x => x.id === user.id)) {
			friend.receivedFriendRequests = friend.receivedFriendRequests.filter(x => 
			{
				return x.id !== user.id;
			});
			this.usersRepository.save(friend);
			
			user.sendFriendRequests = user.sendFriendRequests.filter(x => 
			{
				return x.id !== friend.id;
			});
			return this.usersRepository.save(user);
		}
		else
			throw new HttpException('No such friend-request received', HttpStatus.NOT_FOUND);
	}

	// Block A User

	async blockUser(userId: number, blockedId: number): Promise<User> 
	{
		if (userId === blockedId)
			throw new HttpException('Can not block yourself', HttpStatus.CONFLICT);
		const user: User | null = await this.findById(userId);
		if (!user)
			throw new HttpException('User does not exist', HttpStatus.CONFLICT);
		const blocked: User | null = await this.findById(blockedId);
		if (!blocked)
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		if (user.blockedUsers.some(e => e.id === blocked.id))
			throw new HttpException('User already blocked', HttpStatus.NOT_FOUND);

		blocked.blockedFromUsers.push(plainToClass(UserFriendsSerialiser, user));
		await this.usersRepository.save(blocked);
		
		user.blockedUsers.push(plainToClass(UserFriendsSerialiser, blocked));
		return await this.usersRepository.save(user);
	}

	// Unblock A User

	async unblockUser(userId: number, blockedId: number): Promise<User> 
	{
		if (userId === blockedId)
			throw new HttpException('Can not unblock yourself', HttpStatus.CONFLICT);
		const user: User | null = await this.findById(userId);
		if (!user)
			throw new HttpException('User does not exist', HttpStatus.CONFLICT);
		const blocked: User | null = await this.findById(blockedId);
		if (!blocked)
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		if (!user.blockedUsers.some(e => e.id === blocked.id))
			throw new HttpException('User is not blocked', HttpStatus.NOT_FOUND);

		blocked.blockedFromUsers = blocked.blockedFromUsers.filter(x => 
		{
			return x.id !== user.id;
		});
		this.usersRepository.save(blocked);
		
		user.blockedUsers = user.blockedUsers.filter(x => 
		{
			return x.id !== blocked.id;
		});
		return await this.usersRepository.save(user);
	}

	// Add A Win To User

	async addWin(userId: number): Promise<User> 
	{
		const user: User | null = await this.findById(userId);
		if (!user)
			return ;
		user.wins++;
		return await this.usersRepository.save(user);
	}

	// Add A Lost To User

	async addLose(userId: number): Promise<User> 
	{
		const user: User | null = await this.findById(userId);
		if (!user)
			return ;
		user.loses++;
		return await this.usersRepository.save(user);
	}
}