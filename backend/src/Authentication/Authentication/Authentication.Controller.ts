import { Get, Req, Controller, HttpCode, Post, UseGuards, Res, UseInterceptors, ClassSerialiserInterceptor } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Response } from 'express';

import { AuthenticationService } from './Authentication.Service';
import RequestWithUser from '../Interfaces/RequestWithUser.Interface';
import JwtAuthenticationGuard from '../JSONWebToken/JWT.Strategy';
import { UsersService } from '../../Users/Users.Service';
import { User } from '../../Users/Users.Entity';
import { FortyTwoAuthGuard } from '../FourtyTwo/FourtyTwo.Strategy';

@Controller('authentication')
@UseInterceptors(ClassSerialiserInterceptor)
export class AuthenticationController 
{
	constructor
	(
		private readonly authenticationService: AuthenticationService,
		private readonly usersService: UsersService
	) {}

	@UseGuards(JwtAuthenticationGuard)
	@Get()
	authenticate(@Req() request: RequestWithUser) 
	{
		const user = request.body;
		user.password = undefined;
		return user;
	}

	@UseInterceptors(ClassSerialiserInterceptor)
	@UseGuards(FortyTwoAuthGuard)
	@Get('callback')
	async login(@Req() request: RequestWithUser, @Res() response: Response): Promise<User> 
	{
		const user = request.user;
		const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.loginName);
		const 
		{
			cookie: refreshTokenCookie,
			token: refreshToken
		} = this.authenticationService.getCookieWithJwtRefreshToken(user.loginName, user.isTwoFactorAuthenticationEnabled);

		await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

		request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

		await this.usersService.setStatus(1, user.id);

		Logger.log('HOST_URL: ' + process.env.VUE_APP_HOST_URL);
		
		if (user.isTwoFactorAuthenticationEnabled) 
		{
			Logger.log('2fa is enabled');
			response.status(302).redirect(`${process.env.VUE_APP_HOST_URL}:8080/2falogin`);
		}
		else 
		{
			Logger.log('2fa is disabled')
			await this.usersService.setStatus(1, user.id);
			response.status(302).redirect(`${process.env.VUE_APP_HOST_URL}:8080/profile`);
		}

		return await this.usersService.findById(user.id);
	}

	@UseGuards(JwtAuthenticationGuard)
	@Post('logout')
	@HttpCode(200)
	async logOut(@Req() request: RequestWithUser) 
	{
		await this.usersService.removeRefreshToken(request.user.id);
		await this.usersService.setStatus(0, request.user.id);
		request.res.setHeader('Set-Cookie', this.authenticationService.getCookiesForLogOut());
	}
}