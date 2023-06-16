import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from '../Entities/Message.Entity'
import { User } from '../../Profile/Profile.Entity'
import { ChatRoom } from '../Entities/Room.Entity'
import { RoomMutedUsers } from '../Entities/Muted.Entity';
import { ChatController } from '../Controllers/Chat.Controller';
import { MutedController } from '../Controllers/Muted.Controller';
import { ChatGateway } from '../Gateway/Chat.Gateway';
import { MessageService } from '../Services/Message.Service';
import { RoomService } from '../Services/Room.Service';
import { ChatService } from '../Services/Chat.Service';
import { MutedService } from '../Services/Muted.Service';
import { UsersModule } from '../../Profile/Profile.Module';

// This defines a module in a Nest.js application for handling chat functionality.
// It imports and configures dependencies related to database models, controllers, services, and a gateway for real-time communication. 
// The module exports these components for use in other parts of the application.

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