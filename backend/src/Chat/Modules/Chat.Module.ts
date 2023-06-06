import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from '../Entities/Message.Entity'
import { User } from '../../Users/Users.Entity'
import { ChatRoom } from '../Entities/Room.Entity'
import { RoomMutedUsers } from '../Entities/Muted.Entity';
import { ChatController } from '../Controllers/Chat.Controller';
import { MutedController } from '../Controllers/Muted.Controller';
import { ChatGateway } from '../Gateway/Chat.Gateway';
import { MessageService } from '../Services/Message.Service';
import { RoomService } from '../Services/Room.Service';
import { ChatService } from '../Services/Chat.Service';
import { MutedService } from '../Services/Muted.Service';
import { UsersModule } from '../../Users/Users.Module';

@Module({
	imports: 
	[
		UsersModule,
		TypeOrmModule.forFeature([User, RoomMutedUsers, ChatRoom, Message])
	],
	providers: [ChatService, RoomService, MessageService, MutedService, ChatGateway],
	controllers: [ChatController, MutedController],
	exports: [ChatService, RoomService, MessageService, MutedService],
})

export class ChatModule {}