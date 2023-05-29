import { GameService } from './game.service';
import JwtTwoFactorGuard from 'src/authentication/twoFactor/twoFactor.guard';
import 
{
	Controller,
	Get,
	UseGuards,
} from '@nestjs/common';

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