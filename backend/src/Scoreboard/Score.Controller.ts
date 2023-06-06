import { ScoreService } from './Score.Service';
import { Score } from './Score.Entity';
import JwtTwoFactorGuard from '../Authentication/TwoFactor/TwoFactor.Guard';
import { User } from '../Users/Users.Entity';

import { Controller, Param, Get, Post, Body, HttpCode, UseGuards, UseInterceptors, ClassSerialiserInterceptor, HttpException, HttpStatus } from '@nestjs/common';

@Controller('score')
export class ScoreController 
{
	constructor
	(
		private readonly scoreService: ScoreService
	){}

	@Get('all')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async getAll():Promise<Score[]>
	{
		return await this.scoreService.findAll();
	}
	
	@Post('add')
	@HttpCode(201)
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async addScore(@Body() score: Score, userId: number, user2Id: number): Promise<Score> 
	{
		return await this.scoreService.addScore(score, userId, user2Id);
	}

	@Get('ladder/desc/limit/:limit')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async getPlayersSortedByWins(@Param('limit') limit: number): Promise<User[]> 
	{
		if (limit > 100)
			throw new HttpException('limit to big', HttpStatus.UNPROCESSABLE_ENTITY)
		return await this.scoreService.getPlayersSortedByWins(limit);
	}

	@Get('matchHistory/:userId/:limit')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async getMatchHistoryByUserID(@Param('limit') limit: number, @Param('userId') userId: number): Promise<Score[]> 
	{
		if (limit > 100)
			throw new HttpException('limit to big', HttpStatus.UNPROCESSABLE_ENTITY)
		return await this.scoreService.getMatchHistoryByUserID(userId, limit);
	}
}