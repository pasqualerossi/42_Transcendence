import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from '../Entities/message.entity'
import { User } from '../../Users/Users.entity'
import { ChatRoom } from '../Entities/room.entity'
import { RoomMutedUsers } from '../Entities/muted.entity';
import { ChatController } from '../Controllers/chat.controller';
import { MutedController } from '../Controllers/muted.controller';
import { ChatGateway } from '../Gateway/chat.gateway';
import { MessageService } from '../Services/message.service';
import { RoomService } from '../Services/room.service';
import { ChatService } from '../Services/chat.service';
import { MutedService } from '../Services/muted.service';
import { UsersModule } from '../../Users/users.module';

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