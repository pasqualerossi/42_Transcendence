import { Get, Req, Controller, HttpCode, Post, UseGuards, Res, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { Logger } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { FortyTwoAuthGuard } from './fourtyTwo/fourtyTwo.guard';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
	constructor(
		private readonly authenticationService: AuthenticationService,
		private readonly usersService: UsersService
	) {}

	@UseGuards(JwtAuthenticationGuard)
	@Get()
	authenticate(@Req() request: RequestWithUser) {
		const user = request.body;
		user.password = undefined;
		return user;
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@UseGuards(FortyTwoAuthGuard)
	@Get('callback')
	async login(@Req() request: RequestWithUser, @Res() response: Response): Promise<User> {
		const user = request.user;
		const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.loginName);
		const {
			cookie: refreshTokenCookie,
			token: refreshToken
		} = this.authenticationService.getCookieWithJwtRefreshToken(user.loginName, user.isTwoFactorAuthenticationEnabled);

		await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

		request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

		await this.usersService.setStatus(1, user.id);

		Logger.log('HOST_URL: ' + process.env.VUE_APP_HOST_URL);
		
		if (user.isTwoFactorAuthenticationEnabled) {
			Logger.log('2fa is enabled');
			response.status(302).redirect(`${process.env.VUE_APP_HOST_URL}:8080/2falogin`);
		}
		else {
			Logger.log('2fa is disabled')
			// user is logged in after authenticating 2fa --> status = online
			await this.usersService.setStatus(1, user.id);
			response.status(302).redirect(`${process.env.VUE_APP_HOST_URL}:8080/profile`);
		}

		return await this.usersService.findById(user.id);
	}

	@UseGuards(JwtAuthenticationGuard)
	@Post('logout')
	@HttpCode(200)
	async logOut(@Req() request: RequestWithUser) {
		await this.usersService.removeRefreshToken(request.user.id);
		await this.usersService.setStatus(0, request.user.id);
		request.res.setHeader('Set-Cookie', this.authenticationService.getCookiesForLogOut());
	}
}
