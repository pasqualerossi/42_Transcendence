import { Injectable } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from '../entities/room.entity';

@Injectable()
export class RoomService {
	constructor(
		@InjectRepository(ChatRoom)
		private roomRepository: Repository<ChatRoom>,
	) {}

	findAll(): Promise<ChatRoom[]> {
		return this.roomRepository.find({
			relations: [
				'chatUser',
				'messages',
				'admins',
				'bannedUsers',
				'roomMutedUsers',
				'roomMutedUsers.user'
			]
		});
	}

	findById(id: number): Promise<ChatRoom> {
		return this.roomRepository.findOne({
			where: {id: id},
			relations: [
				'chatUser',
				'messages',
				'admins',
				'bannedUsers',
				'roomMutedUsers',
				'roomMutedUsers.user'
			]
		});
	}

	findByName(roomName: string): Promise<ChatRoom> {
		return this.roomRepository.findOne({
			where: {name: roomName},
			relations: [
				'chatUser',
				'messages',
				'admins',
				'bannedUsers',
				'roomMutedUsers',
				'roomMutedUsers.user'
			]
		});
	}
	
	findGroups(): Promise<ChatRoom[]> {
		return this.roomRepository.find({
			where: {access: Not('private')},
			relations: [
				'chatUser',
				'messages',
				'admins',
				'bannedUsers',
				'roomMutedUsers',
				'roomMutedUsers.user'
			]
		})
	}

	buildPrivateRoomName(name1: string, name2: string): string {
		if (name1 < name2)
			return name1 + '_' + name2;
		return name2 + '_' + name1;
	}
}
