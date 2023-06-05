import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from '../JSONWebToken/jwt.strategy';
import { JwtTwoFactorStrategy } from '../TwoFactor/twoFactor.strategy';
import { FortyTwoStrategy } from '../FourtyTwo/fourtyTwo.strategy';
import { UsersModule } from '../../Users/Users.module';

@Module({
	imports: 
	[
		UsersModule,
		PassportModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => 
			({
				secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
				signOptions: 
				{
					expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
				},
			}),
		}),
	],
	providers: [AuthenticationService, JwtStrategy, JwtTwoFactorStrategy, FortyTwoStrategy],
	controllers: [AuthenticationController]
})
export class AuthenticationModule {}