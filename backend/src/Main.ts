import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from './Users/Users.Entity';
import { UsersModule } from './Users/Users.Module';
import { ChatModule } from './Chat/Modules/Chat.Module';
import { Score } from './Scoreboard/Score.Entity';
import { ScoreModule } from './Scoreboard/Score.Module';
import { GameModule } from './Game/Game.Module';
import { TwoFactorAuthenticationController } from './Authentication/TwoFactor/TwoFactor.Controller';
import { TwoFactorAuthenticationService } from './Authentication/TwoFactor/TwoFactor.Service';
import { AuthenticationService } from './Authentication/Authentication/Authentication.Service';
import { ChatRoom } from './Chat/Entities/Room.Entity'
import { Message } from './Chat/Entities/Message.Entity'
import { RoomMutedUsers } from './Chat/Entities/Muted.Entity'
import DatabaseFile from './Database/DatabaseFile.Entity';

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