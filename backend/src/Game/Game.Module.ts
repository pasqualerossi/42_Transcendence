import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Score } from '../Scoreboard/Score.Entity'
import { GameGateway } from './Game.Gateway';
import { GameService } from './Game.Service';
import { UsersModule } from '../Users/Users.Module';
import { ScoreModule } from 'src/Scoreboard/Score.Module';
import { GameController } from './Game.Controller';
import { ChatModule } from 'src/Chat/Modules/Chat.Module';

@Module({
	imports: 
	[
		UsersModule,
		ScoreModule,
		ChatModule,
		TypeOrmModule.forFeature([Score])
	],
	providers: [GameService, GameGateway],
	exports: [GameService],
	controllers: [GameController]
})
export class GameModule {}