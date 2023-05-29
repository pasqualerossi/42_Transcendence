import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ChatRoom } from './room.entity';

@Entity()
export class Message {

	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	fromId: number;

	@Column()
	fromName: string;

	@Column()
	text: string;

	@Column()
	timestamp: string;

	@ManyToOne(() => ChatRoom, chatRoom => chatRoom.messages, {onDelete: "SET NULL"})
	chatRoom: ChatRoom;
}