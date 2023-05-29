import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtTwoFactorStrategy } from './twoFactor/twoFactor.strategy';
import { FortyTwoStrategy } from './fourtyTwo/fourtyTwo.strategy';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
				signOptions: {
					expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
				},
			}),
		}),
	],
	providers: [AuthenticationService, JwtStrategy, JwtTwoFactorStrategy, FortyTwoStrategy],
	controllers: [AuthenticationController]
})
export class AuthenticationModule {}