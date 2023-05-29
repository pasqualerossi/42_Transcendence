import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/modules/chat.module';
import { Score } from './scoreboard/score.entity';
import { ScoreModule } from './scoreboard/score.module';
import { GameModule } from './game/game.module';
import { TwoFactorAuthenticationController } from './authentication/twoFactor/twoFactor.controller';
import { TwoFactorAuthenticationService } from './authentication/twoFactor/twoFactor.service';
import { AuthenticationService } from './authentication/authentication/authentication.service';
import { JwtService } from '@nestjs/jwt';
import DatabaseFile from './database/databaseFile.entity';
import { ChatRoom } from './chat/entities/room.entity'
import { Message } from './chat/entities/message.entity'
import { RoomMutedUsers } from './chat/entities/muted.entity'

async function bootstrap() 
{
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors({
		credentials: true,
		origin: process.env.VUE_APP_HOST_URL + ':8080',
	});
	app.use(cookieParser());

	const config = new DocumentBuilder()
		.setTitle('Transcendence')
		.setDescription('Collection of APIs')
		.setVersion('0.10')
		.build();
	
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}

@Module ({
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

bootstrap();
