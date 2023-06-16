import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthenticationService } from './Authentication.Service';
import { AuthenticationController } from './Authentication.Controller';
import { JwtStrategy } from '../JSONWebToken/JWT.Strategy';
import { JwtTwoFactorStrategy } from '../TwoFactor/TwoFactor.Strategy';
import { FortyTwoStrategy } from '../FourtyTwo/FourtyTwo.Strategy';
import { UsersModule } from '../../Profile/Profile.Module';

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