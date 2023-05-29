import { ClassSerializerInterceptor, Controller, Post, UseInterceptors, Res, UseGuards, Req, UnauthorizedException, Body, HttpCode, Logger, Get } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactor.service';
import { Response } from 'express';
import JwtAuthenticationGuard from '../jwt/jwt.guard';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { UsersService } from 'src/users/users.service';
import { TwoFactorAuthenticationCodeDto } from './twoFactor.dto';
import { AuthenticationService } from '../authentication.service';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
	constructor(
		private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
		private readonly usersService: UsersService,
		private readonly authenticationService: AuthenticationService,
	) {}

	@Post('turn-on')
	@HttpCode(200)
	@UseGuards(JwtAuthenticationGuard)
	async turnOnTwoFactorAuthentication(
		@Req() request: RequestWithUser,
		@Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
	) {
		const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
			twoFactorAuthenticationCode, request.user
		);
		if (!isCodeValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}

		// user is logged out after activating 2fa --> status = offline
		await this.usersService.setStatus(0, request.user.id);

		await this.usersService.turnOnTwoFactorAuthentication(request.user.id);
	}

	@Post('turn-off')
	@HttpCode(200)
	@UseGuards(JwtAuthenticationGuard)
	async turnOffTwoFactorAuthentication(
		@Req() request: RequestWithUser,
		@Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
	) {
		await this.usersService.turnOffTwoFactorAuthentication(request.user.id);
	}

	@Get('generate')
	@UseGuards(JwtAuthenticationGuard)
	async register(@Res() response: Response, @Req() request: RequestWithUser) {
		const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);

		response.setHeader('content-type','image/png')
		response.setHeader('Cache-control','max-age=0, must-revalidate')

		return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
	}

	@Post('authenticate')
	@HttpCode(200)
	@UseInterceptors(ClassSerializerInterceptor)
	@UseGuards(JwtAuthenticationGuard)
	async authenticate(
		@Req() request: RequestWithUser,
		@Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
	) {
		const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
			twoFactorAuthenticationCode, request.user
		);
		if (!isCodeValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}

		const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.loginName, true);

		// user is logged in after authenticating 2fa --> status = online
		await this.usersService.setStatus(1, request.user.id);

		request.res.setHeader('Set-Cookie', [accessTokenCookie]);

		return request.user;
	}
}