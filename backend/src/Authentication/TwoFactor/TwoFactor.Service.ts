import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

import { User } from '../../Profile/Profile.Entity';
import { UsersService } from '../../Profile/Profile.Service';

@Injectable()
export class TwoFactorAuthenticationService 
{
	constructor 
	(
		private readonly usersService: UsersService,
		private readonly configService: ConfigService
	) {}

	public async pipeQrCodeStream(stream: Response, otpauthUrl: string) 
	{
		return toFileStream(stream, otpauthUrl);
	}

	public async generateTwoFactorAuthenticationSecret(user: User) 
	{
		const secret = authenticator.generateSecret();

		const otpauthUrl = authenticator.keyuri(user.loginName, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);

		await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);

		return {
			secret,
			otpauthUrl
		}
	}

	public isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) 
	{
		return authenticator.verify
		({
			token: twoFactorAuthenticationCode,
			secret: user.twoFactorAuthenticationSecret
		})
	}
}