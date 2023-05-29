import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from '../entities/message.entity'
import { User } from '../../users/users.entity'
import { ChatRoom } from '../entities/room.entity'
import { RoomMutedUsers } from '../entities/muted.entity';

import { ChatController } from '../controllers/chat.controller';
import { MutedController } from '../controllers/muted.controller';
import { ChatGateway } from '../chat.gateway';

import { MessageService } from '../services/message.service';
import { RoomService } from '../services/room.service';
import { ChatService } from '../services/chat.service';
import { MutedService } from '../services/muted.service';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [
		UsersModule,
		TypeOrmModule.forFeature([User, RoomMutedUsers, ChatRoom, Message])
	],
	providers: [ChatService, RoomService, MessageService, MutedService, ChatGateway],
	controllers: [ChatController, MutedController],
	exports: [ChatService, RoomService, MessageService, MutedService],
})
export class ChatModule {}