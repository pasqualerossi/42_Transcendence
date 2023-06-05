import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Score } from './score.entity';
import { UsersService } from 'src/Users.service';
import { UserFriendsSerialiser } from 'src/Users.serialiser';
import { User } from 'src/Users.entity';

@Injectable() 
export class ScoreService 
{
	constructor
	(
		@InjectRepository(Score)
		private scoreRepository: Repository<Score>,
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	
		private readonly usersService: UsersService,
	) {}

	logger: Logger = new Logger(ScoreService.name);

	findAll(): Promise<Score[]> 
	{
		return this.scoreRepository.find
		({
			relations: 
			[
				'matchHistoryUsers',
			]
		});
	}

	async addScore(score: Score, winnerId: number, loserId: number): Promise<Score> 
	{
		const winner = await this.usersService.findById(winnerId);
		const loser = await this.usersService.findById(loserId);
		const serializedWinner = plainToClass(UserFriendsSerialiser, winner, {excludeExtraneousValues: true});
		const serializedLoser = plainToClass(UserFriendsSerialiser, loser, {excludeExtraneousValues: true});
		
		score.matchHistoryUsers = [];
		const newScore = this.scoreRepository.create(score);
		newScore.matchHistoryUsers = [serializedWinner, serializedLoser];
		return await this.scoreRepository.save(newScore);
	}

	async getPlayersSortedByWins(limit: number): Promise<User[]> 
	{
		return await this.usersRepository.createQueryBuilder('user')
			.orderBy('user.wins', 'DESC')
			.limit(limit)
			.getMany()
	}

	async getMatchHistoryByUserID(userId: number, limit: number): Promise<Score[]> 
	{
		return await this.scoreRepository.createQueryBuilder('score')
			.where('score.playerOneId = :id', {id: userId})
			.orWhere('score.playerTwoId = :id', {id: userId})
			.leftJoinAndSelect('score.matchHistoryUsers', 'matchHistoryUsers')
			.limit(limit)
			.getMany()
	}
}