import { Injectable } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomMutedUsers } from '../entities/muted.entity';
import { User } from '../../users/users.entity';
import { ChatRoom } from '../entities/room.entity';
import { plainToClass } from 'class-transformer';
import { UserFriendsSerializer } from '../../users/users.serializer';


@Injectable()
export class MutedService {
	constructor(
		@InjectRepository(RoomMutedUsers)
		private mutedRepository: Repository<RoomMutedUsers>,
	) {}

	async createMuted(user: User, room: ChatRoom, muteTime: number): Promise<RoomMutedUsers> {
		const roomMutedUsers = this.mutedRepository.create({
			muteTime: muteTime,
			roomId: room.id,
			userId: user.id,
			room: room,
			user: plainToClass(UserFriendsSerializer, user)
		})
		return await this.mutedRepository.save(roomMutedUsers);
	}

	async deleteMuted(roomMutedUsersId: number) {
		return await this.mutedRepository.delete(roomMutedUsersId);
	}

	findAll(): Promise<RoomMutedUsers[]> {
		return this.mutedRepository.find({
			relations: [
				'room',
				'user',
			]
		});
	}

	findById(id: number): Promise<RoomMutedUsers> {
		return this.mutedRepository.findOne({
			where: {roomMutedUsersId: id},
			relations: [
				'room',
				'user',
			]
		});
	}
}
