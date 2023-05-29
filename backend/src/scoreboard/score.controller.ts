import { ScoreService } from './score.service';
import { Score } from './score.entity';
import {
	Controller,
	Param,
	Get,
	Post,
	Body,
	HttpCode,
	UseGuards,
	UseInterceptors,
	ClassSerializerInterceptor,
	HttpException,
	HttpStatus
} from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/twoFactor/twoFactor.guard';
import { User } from 'src/users/users.entity';

@Controller('score')
export class ScoreController {
	constructor(
		private readonly scoreService: ScoreService
	){}

	@Get('all')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	async getAll():Promise<Score[]>{
		return await this.scoreService.findAll();
	}
	
	@Post('add')
	@HttpCode(201)
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	async addScore(@Body() score: Score, userId: number, user2Id: number): Promise<Score> {
		return await this.scoreService.addScore(score, userId, user2Id);
	}

	@Get('ladder/desc/limit/:limit')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	async getPlayersSortedByWins(@Param('limit') limit: number): Promise<User[]> {
		if (limit > 100)
			throw new HttpException('limit to big', HttpStatus.UNPROCESSABLE_ENTITY)
		return await this.scoreService.getPlayersSortedByWins(limit);
	}

	@Get('matchHistory/:userId/:limit')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	async getMatchHistoryByUserID(@Param('limit') limit: number, @Param('userId') userId: number): Promise<Score[]> {
		if (limit > 100)
			throw new HttpException('limit to big', HttpStatus.UNPROCESSABLE_ENTITY)
		return await this.scoreService.getMatchHistoryByUserID(userId, limit);
	}
}
