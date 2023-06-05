import { Controller, Get, Param, UseGuards, UseInterceptors, ClassSerialiserInterceptor } from '@nestjs/common';
import { RoomService } from '../Services/room.service';
import { UsersService } from '../../Users.service';
import { ChatService } from '../Services/chat.service';
import { ChatRoom } from '../Entities/room.entity';
import JwtAuthenticationGuard from 'src/Authentication/JSONWebToken/jwt.strategy';

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