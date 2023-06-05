import { MutedService } from '../Services/muted.service';
import { RoomMutedUsers } from '../Entities/muted.entity';
import JwtAuthenticationGuard from 'src/Authentication/JSONWebToken.strategy';
import RequestWithUser from 'src/Authentication/Interfaces/requestWithUser.interface';
import { RoomService } from '../Services/room.service';
import { UsersService } from '../../Users.service';

import { Controller, Get, Post, Param, UseGuards, UseInterceptors, Req, ClassSerialiserInterceptor, HttpException, HttpStatus} from '@nestjs/common';

@Controller('muted')
export class MutedController 
{
	constructor
	(
		private readonly mutedService: MutedService,
		private readonly roomService: RoomService,
		private readonly usersService: UsersService,
	){}

	@Get('all')
	@UseGuards(JwtAuthenticationGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async getAll():Promise<RoomMutedUsers[]>
	{
		return await this.mutedService.findAll();
	}

	@Post('create/:roomName')
	@UseGuards(JwtAuthenticationGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async sendFriendReqeuest(@Req() request: RequestWithUser, @Param('roomName') roomName: string): Promise<RoomMutedUsers> 
	{
		const user = await this.usersService.findById(request.user.id);
		const room = await this.roomService.findByName(roomName);
		if (!user)
		throw new HttpException('user not found', HttpStatus.CONFLICT);
		if (!room)
			throw new HttpException('room not found', HttpStatus.CONFLICT);
		return await this.mutedService.createMuted(user, room, 30);
	}
}
