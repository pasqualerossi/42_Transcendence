import { PassportStrategy } from '@nestjs/passport';
import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import {Strategy} from 'passport-42';
import { User } from 'src/users/users.entity';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy){
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UsersService,
		) {
			super({
				clientID: configService.get('FORTYTWO_APP_ID'),
				clientSecret: configService.get('FORTYTWO_APP_SECRET'),
				callbackURL: configService.get('CALLBACK_URL'),
				profileFields: {
					'id': function (obj) { return String(obj.id); },
					'username': 'login',
					'image_url': 'image_url'
				  }
			});
	}

	logger: Logger = new Logger(FortyTwoStrategy.name)

	async validate(accessToken: string, refreshToken: string, profile: any){
		const user = await this.userService.findByLoginName(profile.username)
		if (user) {
			return user
		}
		else {
			const newUser = new User({
				loginName: profile.username,
				username: profile.username,
				profilePictureURL: profile.image_url,
				friends: [],
				sendFriendRequests: [],
				receivedFriendRequests: [],
				roomAdmin: [],
				chatRoom: [],
				bannedRooms: [],
				blockedUsers: [],
				blockedFromUsers: []
			});
			return await this.userService.create(newUser);
		}
	}
}