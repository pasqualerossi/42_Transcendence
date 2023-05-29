import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne
} from 'typeorm';
import { ChatRoom } from './room.entity';
import { User } from '../../users/users.entity';
import { CreateDateColumn } from "typeorm";
import { UserFriendsSerializer } from '../../users/users.serializer';

@Entity()
export class RoomMutedUsers {
	@PrimaryGeneratedColumn()
	public roomMutedUsersId!: number;

	@CreateDateColumn()
	created_at: Date;

	@Column()
	public muteTime!: number;

	@Column()
	public roomId!: number;

	@Column()
	public userId!: number;

	@ManyToOne(() => ChatRoom, (room) => room.roomMutedUsers, { onDelete: 'CASCADE' })
	public room!: ChatRoom;

	@ManyToOne(() => User, (user) => user.roomMutedUsers, { onDelete: 'CASCADE' })
	public user!: UserFriendsSerializer;
}