import 
{
	Controller,
	Get,
	UseGuards,
} from '@nestjs/common';

import { GameService } from './game.service';
import JwtTwoFactorGuard from 'src/Authentication/TwoFactor/twoFactor.guard';

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