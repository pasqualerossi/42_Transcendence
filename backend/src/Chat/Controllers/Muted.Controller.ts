import { MutedService } from '../Services/Muted.Service';
import { RoomMutedUsers } from '../Entities/Muted.Entity';
import JwtAuthenticationGuard from '../../Authentication/JSONWebToken/JWT.Strategy';
import { RequestUser } from '../../Authentication/Interfaces/RequestUser.Interface';
import { RoomService } from '../Services/Room.Service';
import { UsersService } from '../../Users/Users.Service';

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

	// Get Everyone Who's Muted

	async getAll():Promise<RoomMutedUsers[]>
	{
		return await this.mutedService.findAll();
	}

	@Post('create/:roomName')
	@UseGuards(JwtAuthenticationGuard)
	@UseInterceptors(ClassSerialiserInterceptor)

	// Send Friend Request

	async sendFriendReqeuest(@Req() request: RequestUser, @Param('roomName') roomName: string): Promise<RoomMutedUsers> 
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
