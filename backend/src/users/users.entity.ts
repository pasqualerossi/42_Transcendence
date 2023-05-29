import { Exclude } from 'class-transformer';
import DatabaseFile from 'src/files/databaseFile.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToMany,
	JoinTable,
	ManyToOne,
	OneToMany
} from 'typeorm';
import { ChatRoom } from '../chat/entities/room.entity';
import { Score } from '../scoreboard/score.entity';
import { RoomMutedUsers } from '../chat/entities/muted.entity';
import { UserFriendsSerializer } from './users.serializer'

@Entity()
export class User {

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}

	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	loginName: string;

	@Column({unique: true})
	username: string;

	@Exclude()
	@Column({ nullable: true })
	twoFactorAuthenticationSecret?: string;

	@Column({ default: false })
	isTwoFactorAuthenticationEnabled: boolean;

	@Exclude()
	@Column({ nullable: true })
	currentHashedRefreshToken?: string;

	@Column({nullable: true})
	public profilePictureURL: string;

	@JoinColumn({ name: 'avatarId' })
	@ManyToOne(() => DatabaseFile, { nullable: true })
	public avatar?: DatabaseFile;

	@Column({ nullable: true })
	public avatarId?: number;

	@Column({ default: 0 })
	status: number;

	@ManyToMany(type => User)
	@JoinTable({ joinColumn: { name: 'users_id_1' } })
	friends: UserFriendsSerializer[];

	@ManyToMany(() => User, user => user.receivedFriendRequests)
	@JoinTable({ joinColumn: { name: 'senderId' } })
	sendFriendRequests: UserFriendsSerializer[];

	@ManyToMany(() => User, user => user.sendFriendRequests)
	receivedFriendRequests: UserFriendsSerializer[];

	@ManyToMany(() => ChatRoom, roomAdmin => roomAdmin.admins)
	@JoinTable()
	roomAdmin: ChatRoom[];

	@ManyToMany(() => ChatRoom, chatRoom => chatRoom.chatUser)
	@JoinTable()
	chatRoom: ChatRoom[];

	@ManyToMany(() => ChatRoom, bannedRooms => bannedRooms.bannedUsers)
	@JoinTable()
	bannedRooms: ChatRoom[];

	@ManyToMany(() => User, user => user.blockedFromUsers)
	@JoinTable({ joinColumn: { name: 'blockerId' } })
	blockedUsers: UserFriendsSerializer[];

	@ManyToMany(() => User, user => user.blockedUsers)
	blockedFromUsers: UserFriendsSerializer[];

	@OneToMany(() => RoomMutedUsers, roomMutedUsers => roomMutedUsers.user, { cascade: true })
	public roomMutedUsers!: RoomMutedUsers[];

	@Column({ default: 0 })
	rank: number;

	@Column({ default: 0 })
	wins: number;

	@Column({ default: 0 })
	loses: number;

	@ManyToMany(() => Score, matchHistory => matchHistory.matchHistoryUsers)
	@JoinTable()
	matchHistory: Score[];
}

