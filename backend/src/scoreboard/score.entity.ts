import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../users/users.entity'

import { UserFriendsSerializer } from 'src/users/users.serializer';

@Entity()
export class Score {
	constructor(partial: Partial<Score>) {
		Object.assign(this, partial);
	}

	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	created_at: Date;

	@Column()
	playerOneId: number;

	@Column()
	playerTwoId: number;

	@Column()
	scorePlayerOne: number;

	@Column()
	scorePlayerTwo: number;

	@ManyToMany(() => User, matchHistoryUsers => matchHistoryUsers.matchHistory, {
		onDelete: 'CASCADE',
	})
	matchHistoryUsers: UserFriendsSerializer[];
}