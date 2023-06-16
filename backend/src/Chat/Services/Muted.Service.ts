import { Injectable } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { UserFriendsSerialiser } from '../../Profile/Profile.Serialiser';
import { RoomMutedUsers } from '../Entities/Muted.Entity';
import { User } from '../../Profile/Profile.Entity';
import { ChatRoom } from '../Entities/Room.Entity';

@Injectable()
export class MutedService 
{
	constructor
	(
		@InjectRepository(RoomMutedUsers)
		private mutedRepository: Repository<RoomMutedUsers>,
	) {}

	// Muting a user in a chat room for a specified duration.

	async createMuted(user: User, room: ChatRoom, muteTime: number): Promise<RoomMutedUsers> 
	{
		const roomMutedUsers = this.mutedRepository.create({
			muteTime: muteTime,
			roomId: room.id,
			userId: user.id,
			room: room,
			user: plainToClass(UserFriendsSerialiser, user)
		})
		return await this.mutedRepository.save(roomMutedUsers);
	}

	// Delete A Muted Person

	async deleteMuted(roomMutedUsersId: number) 
	{
		return await this.mutedRepository.delete(roomMutedUsersId);
	}

	// Find All Muted People

	findAll(): Promise<RoomMutedUsers[]> 
	{
		return this.mutedRepository.find({
			relations: 
			[
				'room',
				'user',
			]
		});
	}

	// Find Muted Person By Their ID

	findById(id: number): Promise<RoomMutedUsers> 
	{
		return this.mutedRepository.findOne({
			where: {roomMutedUsersId: id},
			relations: 
			[
				'room',
				'user',
			]
		});
	}
}