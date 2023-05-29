import {
	Controller,
	Get,
	Post,
	Param,
	UseGuards,
	UseInterceptors,
	Req,
	ClassSerializerInterceptor,
	HttpException,
	HttpStatus
} from '@nestjs/common';
import { MutedService } from '../services/muted.service';
import { RoomMutedUsers } from '../entities/muted.entity';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt.guard';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';
import { RoomService } from '../services/room.service';
import { UsersService } from '../../users/users.service';

@Controller('muted')
export class MutedController {
	constructor(
		private readonly mutedService: MutedService,
		private readonly roomService: RoomService,
		private readonly usersService: UsersService,
	){}

	@Get('all')
	@UseGuards(JwtAuthenticationGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	async getAll():Promise<RoomMutedUsers[]>{
		return await this.mutedService.findAll();
	}

	@Post('create/:roomName')
	@UseGuards(JwtAuthenticationGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	async sendFriendReqeuest(@Req() request: RequestWithUser, @Param('roomName') roomName: string): Promise<RoomMutedUsers> {
		const user = await this.usersService.findById(request.user.id);
		const room = await this.roomService.findByName(roomName);
		if (!user)
		throw new HttpException('user not found', HttpStatus.CONFLICT);
		if (!room)
			throw new HttpException('room not found', HttpStatus.CONFLICT);
		return await this.mutedService.createMuted(user, room, 30);
	}
}
