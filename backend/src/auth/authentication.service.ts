import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	public getCookieWithJwtToken(loginName: string, isSecondFactorAuthenticated: boolean) {
		const payload: TokenPayload = { loginName, isSecondFactorAuthenticated };
		const token = this.jwtService.sign(payload);
		return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
	}

	public getCookieForLogOut() {
		return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
	}

	public getCookieWithJwtAccessToken(loginName: string, isSecondFactorAuthenticated = false) {
		const payload: TokenPayload = { loginName, isSecondFactorAuthenticated };
		const token = this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
			expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
		});
		return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
	}

	public getCookieWithJwtRefreshToken(loginName: string , isSecondFactorAuthenticated) {
		const payload: TokenPayload = { loginName, isSecondFactorAuthenticated };
		const token = this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
			expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
		});
		const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
		return {
			cookie,
			token
		}
	}

	public getCookiesForLogOut() {
		return [
			'Authentication=; HttpOnly; Path=/; Max-Age=0',
			'Refresh=; HttpOnly; Path=/; Max-Age=0'
		];
	}
}