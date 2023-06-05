import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '../../Users/Users.service';

// JSON WEB TOKEN AUTHENTICATION GUARD
@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {}

// JSON WEB TOKEN AUTHENTICATION STRATEGY
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) 
{
	constructor
	(
		private readonly configService: ConfigService,
		private readonly userService: UsersService,
	) 
	{
		super
		({
			jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => 
			{
				return request?.cookies?.Authentication;
			}]),
			secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
		});
	}

	async validate(payload: TokenPayload) 
	{
		return await this.userService.findByLoginName(payload.loginName);
	}
}