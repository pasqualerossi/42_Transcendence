import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/modules/chat.module';
import { Score } from './scoreboard/score.entity';
import { ScoreModule } from './scoreboard/score.module';
import { GameModule } from './game/game.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './auth/authentication.module';
import { TwoFactorAuthenticationController } from './auth/twoFactor/twoFactor.controller';
import { TwoFactorAuthenticationService } from './auth/twoFactor/twoFactor.service';
import { AuthenticationService } from './auth/authentication.service';
import { JwtService } from '@nestjs/jwt';
import DatabaseFile from './files/databaseFile.entity';
import { ChatRoom } from './chat/entities/room.entity'
import { Message } from './chat/entities/message.entity'
import { RoomMutedUsers } from './chat/entities/muted.entity'

@Module
({
	imports: 
	[
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => 
			({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: +configService.get<number>('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				JWT_SECRET: configService.get('JWT_ACCESS_TOKEN_SECRET'),
				JWT_EXPIRATION_TIME: configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
				JWT_REFRESH_TOKEN_SECRET: configService.get('JWT_REFRESH_TOKEN_SECRET'),
				JWT_REFRESH_TOKEN_EXPIRATION_TIME: configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
				entities: [User, Score, DatabaseFile, ChatRoom, Message, RoomMutedUsers],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		GameModule,
		UsersModule,
		ChatModule,
		ScoreModule,
		AuthenticationModule,
	],
	providers: [TwoFactorAuthenticationService, AuthenticationService, JwtService],
	controllers: [TwoFactorAuthenticationController]
})
export class AppModule {}