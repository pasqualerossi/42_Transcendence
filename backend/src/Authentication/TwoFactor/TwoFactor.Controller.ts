import { ClassSerialiserInterceptor, Controller, Post, UseInterceptors, Res, UseGuards, Req, UnauthorizedException, Body, HttpCode, Get } from '@nestjs/common';
import { Response } from 'express';

import { TwoFactorAuthenticationService } from './TwoFactor.Service';
import JwtAuthenticationGuard from '../JSONWebToken/JWT.Strategy';
import { RequestUser } from '../Interfaces/RequestUser.Interface';
import { UsersService } from '../../Users/Users.Service';
import { TwoFactorAuthenticationCodeDto } from './TwoFactor.Dto';
import { AuthenticationService } from '../Authentication/Authentication.Service';

@Controller('2fa')
@UseInterceptors(ClassSerialiserInterceptor)
export class TwoFactorAuthenticationController 
{
	constructor
	(
		private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
		private readonly usersService: UsersService,
		private readonly authenticationService: AuthenticationService,
	) {}

	@Post('turn-on')
	@HttpCode(200)
	@UseGuards(JwtAuthenticationGuard)
	async turnOnTwoFactorAuthentication(
		@Req() request: RequestUser,
		@Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
	) 
	{
		const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
			twoFactorAuthenticationCode, request.user
		);
		if (!isCodeValid) 
		{
			throw new UnauthorizedException('Wrong authentication code');
		}

		// user is logged out after activating 2fa --> status = offline
		await this.usersService.setStatus(0, request.user.id);

		await this.usersService.turnOnTwoFactorAuthentication(request.user.id);
	}

	@Post('turn-off')
	@HttpCode(200)
	@UseGuards(JwtAuthenticationGuard)
	async turnOffTwoFactorAuthentication
	(
		@Req() request: RequestUser,
		@Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
	) 
	{
		await this.usersService.turnOffTwoFactorAuthentication(request.user.id);
	}

	@Get('generate')
	@UseGuards(JwtAuthenticationGuard)
	async register(@Res() response: Response, @Req() request: RequestUser) 
	{
		const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);

		response.setHeader('content-type','image/png')
		response.setHeader('Cache-control','max-age=0, must-revalidate')

		return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
	}

	@Post('authenticate')
	@HttpCode(200)
	@UseInterceptors(ClassSerialiserInterceptor)
	@UseGuards(JwtAuthenticationGuard)
	async authenticate(
		@Req() request: RequestUser,
		@Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
	) {
		const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
			twoFactorAuthenticationCode, request.user
		);
		if (!isCodeValid) 
		{
			throw new UnauthorizedException('Wrong authentication code');
		}

		const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.loginName, true);
		await this.usersService.setStatus(1, request.user.id);
		request.res.setHeader('Set-Cookie', [accessTokenCookie]);
		return request.user;
	}
}