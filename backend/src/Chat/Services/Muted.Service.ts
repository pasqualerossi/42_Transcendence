import { Injectable } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { UserFriendsSerialiser } from '../../Users/Users.Serialiser';
import { RoomMutedUsers } from '../Entities/Muted.Entity';
import { User } from '../../Users/Users.Entity';
import { ChatRoom } from '../Entities/Room.Entity';

@Injectable()
export class MutedService 
{
	constructor
	(
		@InjectRepository(RoomMutedUsers)
		private mutedRepository: Repository<RoomMutedUsers>,
	) {}

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

	async deleteMuted(roomMutedUsersId: number) 
	{
		return await this.mutedRepository.delete(roomMutedUsersId);
	}

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