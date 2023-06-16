import { Controller, Get, UseGuards } from '@nestjs/common';

import { GameService } from './Game.Service';
import JwtTwoFactorGuard from 'src/Authentication/TwoFactor/TwoFactor.Guard';

@Controller('game')
export class GameController 
{
	constructor
	(
		private readonly gameService: GameService,
	){}

	@Get('all')
	@UseGuards(JwtTwoFactorGuard)
	getAll(): number[] 
	{
		return Array.from(this.gameService.gameRooms.keys());
	}
}