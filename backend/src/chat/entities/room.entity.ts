import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { User } from '../../users/users.entity';
import { Message } from './message.entity'
import { RoomMutedUsers } from './muted.entity'

@Entity()
export class ChatRoom {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable: false})
	name: string;

	@Column({nullable: false})
	access: string;

	@Exclude()
	@Column({nullable: true})
	password: string;

	@ManyToMany(() => User, admin => admin.roomAdmin, {
		onDelete: 'CASCADE',
	})
	admins: User[];
	
	@OneToMany(() => Message, message => message.chatRoom)
	messages: Message[];
	
	@ManyToMany(() => User, chatUser => chatUser.chatRoom, {
		onDelete: 'CASCADE',
	})
	chatUser: User[];

	@ManyToMany(() => User, bannedUsers => bannedUsers.bannedRooms, {
		onDelete: 'CASCADE',
	})
	bannedUsers: User[];

	@OneToMany(() => RoomMutedUsers, roomMutedUsers => roomMutedUsers.room, { cascade: true })
	public roomMutedUsers!: RoomMutedUsers[];
}
