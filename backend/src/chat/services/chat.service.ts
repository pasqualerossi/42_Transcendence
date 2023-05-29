import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { Message } from '../entities/message.entity';
import { ChatRoom } from '../entities/room.entity';
import { User } from '../../users/users.entity';

import { RoomService } from './room.service';
import { UsersService } from '../../users/users.service';
import { MutedService } from './muted.service';

import { Socket } from 'socket.io';
import { RoomMutedUsers } from '../entities/muted.entity';

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(Message)
		private messageRepository: Repository<Message>,
		@InjectRepository(ChatRoom)
		private roomRepository: Repository<ChatRoom>,
		@InjectRepository(User)
		private userRepository: Repository<User>,

		private readonly usersService: UsersService,
		private readonly roomService: RoomService,
		private readonly mutedService: MutedService,
	) {}

	async validateToken(client: Socket) {
		const user: User | null = await this.usersService.findById(Number(client.handshake.headers.authorization));
		if (!user) {
			client.disconnect();
			return null;
		}
		return user;
	}

	async roomExists(roomName: string): Promise<Boolean> {
		return (await this.roomRepository.findOne({where: {name: roomName}}) !== null)
	}

	async isMember(roomName: string, userId: number): Promise<Boolean> {
		const room: ChatRoom | null = await this.roomService.findByName(roomName);
		if (!room)
			return false;
		if (room.chatUser.find(e => e.id === userId))
			return true;
		return false;
	}

	async isBanned(roomName: string, userId: number): Promise<Boolean> {
		const room: ChatRoom | null = await this.roomService.findByName(roomName);
		if (!room)
			return false;
		if (room.bannedUsers.find(e => e.id === userId))
			return true;
		return false;
	}

	async isAdmin(roomName: string, userId: number): Promise<Boolean> {
		const user: User | null= await this.usersService.findById(userId)
		if (!user)
			return false;
		if (user.roomAdmin.find(room => room.name === roomName))
			return true;
		return false;
	}

	async isBlocked(userId: number, blockedId: number): Promise<Boolean> {
		const user: User | null = await this.usersService.findById(userId);
		if (!user)
			return false;
		if (user.blockedFromUsers.find(e => e.id === blockedId))
			return true;
		return false;
	}

	async isMuted(userId: number, roomName: string): Promise<Boolean> {
		const user: User | null = await this.usersService.findById(userId);
		const room: ChatRoom | null = await this.roomService.findByName(roomName);
		if (!user)
			throw new HttpException('user not found', HttpStatus.NOT_FOUND);
		if (!room)
			throw new HttpException('room not found', HttpStatus.NOT_FOUND);

		const mutedUserRelation: RoomMutedUsers | undefined = room.roomMutedUsers.find(e => e.userId === user.id);
		if (!mutedUserRelation)
			return false;

		if (new Date() > new Date(mutedUserRelation.created_at.getTime() + mutedUserRelation.muteTime * 60000)) {
			this.mutedService.deleteMuted(mutedUserRelation.roomMutedUsersId);
			return false;
		}
		return true;
	}

	async createRoom(newRoom: {name: string, access: string, password?: string}): Promise<ChatRoom> {
		if (newRoom.password) {
			const salt: string = await bcrypt.genSalt();
			const hash: string = await bcrypt.hash(newRoom.password, salt);
			const room: ChatRoom = this.roomRepository.create({
				name: newRoom.name,
				access: newRoom.access,
				password: hash,
			});
			room.admins = [];
			await this.roomRepository.save(room);
			return room;
		}
		else {
			const room: ChatRoom = this.roomRepository.create({
				name: newRoom.name,
				access: newRoom.access,
				password: null,
			});
			room.admins = [];
			await this.roomRepository.save(room);
			return room;
		}
	}

	async setRoomPrivacy(room: ChatRoom, password: string, access: string) {
		if (password === null) {
			this.roomRepository.update({id: room.id}, {password: password, access: access});
			return ;
		}
		const salt: string = await bcrypt.genSalt();
		const hash: string = await bcrypt.hash(password, salt);
		this.roomRepository.update({id: room.id}, {password: hash, access: access});
	}

	async deleteRoom(roomName: string) {
		await this.roomRepository.delete({name: roomName});
	}

	async setUserAsAdmin(room: ChatRoom, user: User) {
		if (room.admins)
			room.admins.push(user);
		else
			room.admins = [user];
		await this.roomRepository.save(room);
		
		if (user.roomAdmin)
			user.roomAdmin.push(room);
		else
			user.roomAdmin = [room];
		await this.userRepository.save(user);
	}

	async passwordProtectionRoom(roomName: string, password: string): Promise<boolean> {
		const room: ChatRoom | null = await this.roomService.findByName(roomName);
		if (!room)
			return false;

		const isMatch: boolean = await bcrypt.compare(password, room.password);

		return isMatch;
	}

	async joinRoom(roomName: string, userId: number) {
		const room: ChatRoom | null = await this.roomService.findByName(roomName);
		const user: User | null = await this.usersService.findById(userId);

		if (!room || !user)
			return ;
		
		room.chatUser.push(user);
		await this.roomRepository.save(room);
		
		user.chatRoom.push(room);
		await this.userRepository.save(user);
	}

	findInUserArray(arr: Array<User>, userId: number): number {
		return arr.findIndex(user => {
			return user.id === userId;
		});
	}
	
	findInRoomArray(arr: Array<ChatRoom>, roomName: string): number {
		return arr.findIndex(room => {
			return room.name === roomName;
		});
	}

	async leaveRoom(roomName: string, userId: number): Promise<ChatRoom> {
		const room: ChatRoom | null = await this.roomService.findByName(roomName);
		if (!room)
			return ;

		// onDelete: 'CACSCADE' handles the deletions on user side
		const userIndex: number = this.findInUserArray(room.chatUser, userId);
		if (userIndex !== -1) {
			room.chatUser.splice(userIndex, 1);
			await this.roomRepository.save(room);
		}
		// onDelete: 'CACSCADE' handles the deletions on user side
		const adminUserIndex: number = this.findInUserArray(room.admins, userId);
		if (adminUserIndex !== -1) {
			room.admins.splice(adminUserIndex, 1);
			await this.roomRepository.save(room);
		}
		return room;
	}

	async banUserFromRoom(roomName: string, userId: number): Promise<ChatRoom> {
		const room: ChatRoom | null = await this.roomService.findByName(roomName);
		const user: User | null = await this.usersService.findById(userId);
		if (!room)
			throw new HttpException('Room not found', HttpStatus.CONFLICT);
		if (!user)
			throw new HttpException('User not found', HttpStatus.CONFLICT);

		user.bannedRooms.push(room);
		await this.userRepository.save(room);

		room.bannedUsers.push(user);
		return await this.roomRepository.save(room);
	}
	
	async unBanUserFromRoom(roomName: string, userId: number): Promise<ChatRoom> {		
		const room: ChatRoom | null = await this.roomService.findByName(roomName);
		const user: User | null = await this.usersService.findById(userId);
	
		if (!user || !room)
			return ;

		const userIndex: number = this.findInUserArray(room.bannedUsers, user.id);
		if (userIndex !== -1) {
			room.bannedUsers.splice(userIndex, 1);
		}
		return await this.roomRepository.save(room);
	}
	
	async createMessage(roomName: string, userId: number, text: string) {
		const room: ChatRoom | null = await this.roomService.findByName(roomName);
		const user: User | null = await this.usersService.findById(userId);

		if (!user || !room)
			return ;

		const message: Message = this.messageRepository.create({
			fromId: userId,
			fromName: user.username,
			text: text,
			timestamp: 'empty'
		});
		message.chatRoom = room;
		await this.messageRepository.save(message);
		
		room.messages.push(message);
		await this.roomRepository.save(room);
	}

	async createBotMessage(roomName: string, text: string) {
		const room: ChatRoom | null = await this.roomService.findByName(roomName);
		
		if (!room)
			return ;

		const message: Message = this.messageRepository.create({
			fromId: -1,
			fromName: 'ChatBot',
			text: text,
			timestamp: 'empty'
		});
		message.chatRoom = room;
		await this.messageRepository.save(message);
		
		room.messages.push(message);
		await this.roomRepository.save(room);
	}
}
