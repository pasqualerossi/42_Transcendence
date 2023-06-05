import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Score } from '../Scoreboard/score.entity'
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { UsersModule } from '../Users/Users.module';
import { ScoreModule } from 'src/Scoreboard/score.module';
import { GameController } from './game.controller';
import { ChatModule } from 'src/Chat/Modules/chat.module';

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