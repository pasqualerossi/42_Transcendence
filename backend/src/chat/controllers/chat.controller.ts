import { Controller, Get, Param, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { UsersService } from '../../users/users.service';
import { ChatService } from '../services/chat.service';
import { ChatRoom } from '../entities/room.entity';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt.guard';

@Controller('chat')
export class ChatController {
	constructor(
		private readonly roomService: RoomService,
		private readonly messageService: ChatService,
		private readonly chatUserService: UsersService,
	){}

	@Get('room/:name')
	@UseGuards(JwtAuthenticationGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	async getByName(@Param('name') name: string):Promise<ChatRoom>{
		return await this.roomService.findByName(name);
	}
	
	@Get('all')
	@UseGuards(JwtAuthenticationGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	async getAll():Promise<ChatRoom[]>{
		return await this.roomService.findAll();
	}
}
