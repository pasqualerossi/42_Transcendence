import { CreateDateColumn } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

import { ChatRoom } from './Room.Entity';
import { User } from '../../Profile/Profile.Entity';
import { UserFriendsSerialiser } from '../../Profile/Profile.Serialiser';

@Entity() 
export class RoomMutedUsers 
{
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
	public user!: UserFriendsSerialiser;
}