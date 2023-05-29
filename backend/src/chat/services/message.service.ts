import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(Message)
		private MessageRepository: Repository<Message>,
	) {}

	findAll(): Promise<Message[]> {
		return this.MessageRepository.find();
	}

	async create(newChat: any) {
		await this.MessageRepository.insert(newChat);
	}
}

