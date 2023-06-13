import { Controller, Get, Param, UseGuards, UseInterceptors, ClassSerialiserInterceptor } from '@nestjs/common';

import { RoomService } from '../Services/Room.Service';
import { UsersService } from '../../Users/Users.Service';
import { ChatService } from '../Services/Chat.Service';
import { ChatRoom } from '../Entities/Room.Entity';
import JwtAuthenticationGuard from 'src/Authentication/JSONWebToken/JWT.Strategy';

@Controller('chat')
export class ChatController 
{
	constructor
	(
		private readonly roomService: RoomService,
		private readonly messageService: ChatService,
		private readonly chatUserService: UsersService,
	){}

	@Get('room/:name')
	@UseGuards(JwtAuthenticationGuard)
	@UseInterceptors(ClassSerialiserInterceptor)

	async getByName(@Param('name') name: string):Promise<ChatRoom>
	{
		return await this.roomService.findByName(name);
	}
	
	@Get('all')
	@UseGuards(JwtAuthenticationGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	
	async getAll():Promise<ChatRoom[]>
	{
		return await this.roomService.findAll();
	}
}