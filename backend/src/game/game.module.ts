import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from '../scoreboard/score.entity'
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { UsersModule } from 'src/users/users.module';
import { ScoreModule } from 'src/scoreboard/score.module';
import { GameController } from './game.controller';
import { ChatModule } from 'src/chat/modules/chat.module';

@Module({
	imports: [
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