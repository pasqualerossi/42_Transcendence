import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './services/room.service';
import { UsersService } from '../users/users.service';
import { ChatService } from './services/chat.service';
import { MutedService } from './services/muted.service';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';


@WebSocketGateway({
	cors: {
		origin: '*',
	},
	namespace: '/chat'
})
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	constructor(
		private readonly roomService: RoomService,
		private readonly usersService: UsersService,
		private readonly chatService: ChatService,
		private readonly mutedService: MutedService,
	) {}

	logger: Logger = new Logger(ChatGateway.name)
	
	async handleConnection(@ConnectedSocket() client: Socket) {
		const user = await this.chatService.validateToken(client);
		if (!user)
			return ;
		client.data.user = user;
	}
	
	handleDisconnect(@ConnectedSocket() client: Socket) {}

	@SubscribeMessage('enterPrivateRoom')
	async enterPrivateRoom(@MessageBody() receiverId: number, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		const sender = await this.usersService.findById(userId);
		const receiver = await this.usersService.findById(receiverId);

		if (!sender || !receiver)
			throw new HttpException('User Not found', HttpStatus.NOT_FOUND);

		const roomName: string = this.roomService.buildPrivateRoomName(sender.id.toString(), receiver.id.toString());

		if (!await this.chatService.roomExists(roomName)) {
			await this.createRoom({
				roomName,
				access: 'private',
			}, client);
			await this.chatService.joinRoom(roomName, receiver.id);
		}
		await this.enterRoom(roomName, client);

		return roomName;
	}

	@SubscribeMessage('createRoom')
	async createRoom(@MessageBody() data: {roomName: string, access: string, roomPassword?: string}, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		
		if (await this.chatService.roomExists(data.roomName)) {
			this.logger.log(`Error: ${data.roomName} already exists`);
			return false;
		}

		const user = await this.usersService.findById(userId);
		const room = await this.chatService.createRoom({
			name: data.roomName,
			access: data.access,
			password: data.roomPassword,
		});

		if (data.access !== 'private')
			await this.chatService.setUserAsAdmin(room, user);
		await this.chatService.joinRoom(data.roomName, userId);

		this.logger.log(`created room: ${data.roomName}`);
		client.nsp.emit('refreshRooms');
		return true;
	}

	@SubscribeMessage('deleteRoom')
	async deleteRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		if (!this.chatService.isAdmin(roomName, userId))
			throw new HttpException('Admin rights required', HttpStatus.UNAUTHORIZED);
		await this.chatService.deleteRoom(roomName);
		client.nsp.emit('refreshRooms');
		client.nsp.emit('refreshUser');
		client.nsp.emit('resetCurrentRoom', roomName);
		client.leave(roomName);
		return true;
	}

	@SubscribeMessage('validateRoomAccess')
	async validateRoomAccess(@MessageBody() data: {roomName: string, password: string}) {
		return !await this.chatService.passwordProtectionRoom(data.roomName, data.password);
	}
 
	@SubscribeMessage('joinRoom')
	async joinRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		const user = await this.usersService.findById(userId);
		if (await this.chatService.isMember(roomName, userId)) {
			this.logger.log(`already member of: ${roomName}`);
			return false;
		}
		if (await this.chatService.isBanned(roomName, userId)) {
			this.logger.log(`${user.username} is banned from: ${roomName}`);
			client.nsp.to(client.id).emit('banned', roomName);
			return false;
		}
		client.join(roomName);
		await this.chatService.joinRoom(roomName, userId);
		await this.chatService.createBotMessage(roomName, `${user.username} joined!`);
		client.broadcast.to(roomName).emit('refreshCurrentRoom', roomName);
		client.nsp.to(client.id).emit('refreshRooms');
		client.nsp.to(client.id).emit('refreshUser');
		client.leave(roomName);
		this.logger.log(`${user.username} joined room: ${roomName}`);
		return true;
	}

	@SubscribeMessage('enterRoom')
	async enterRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket) {
		client.join(roomName);
		client.broadcast.to(roomName).emit('refreshCurrentRoom', roomName);
		client.nsp.to(client.id).emit('setCurrentRoom', roomName);
		this.logger.log(`joined room: ${roomName}`);
	}
	
	@SubscribeMessage('leaveRoom')
	async leaveRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		const room = await this.chatService.leaveRoom(roomName, userId);
		const user = await this.usersService.findById(userId);
		if (room.chatUser.length < 1) {
			this.deleteRoom(room.name, client);
			client.to(client.id).emit('refreshRooms');
			return true;
		}
		if (room.admins.length < 1) {
			await this.chatService.setUserAsAdmin(room, room.chatUser[0]);
			await this.chatService.createBotMessage(room.name, `${room.chatUser[0].username} is now an Admin!`);
			client.nsp.to(roomName).emit('refreshCurrentRoom', roomName);
		}
		await this.chatService.createBotMessage(room.name, `${user.username} left!`);
		client.nsp.to(client.id).emit('resetCurrentRoom', room.name);
		client.nsp.to(client.id).emit('refreshRooms');
		client.nsp.to(client.id).emit('refreshUser');
		client.broadcast.to(room.name).emit('refreshCurrentRoom', room.name);
		client.leave(room.name);
		this.logger.log(`${user.username} left room: ${room.name}`);
		return true;
	}

	@SubscribeMessage('makeAdmin')
	async makeAdmin(@MessageBody() data: {roomName: string, newAdminId: number}, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		if (!this.chatService.isAdmin(data.roomName, userId))
			throw new HttpException('Admin rights required', HttpStatus.UNAUTHORIZED);
		const newAdmin = await this.usersService.findById(data.newAdminId);
		const room = await this.roomService.findByName(data.roomName);
		await this.chatService.setUserAsAdmin(room, newAdmin);
		await this.chatService.createBotMessage(data.roomName, `${newAdmin.username} is now an Admin!`);
		client.nsp.to(data.roomName).emit('refreshCurrentRoom', data.roomName);
	}

	@SubscribeMessage('setRoomProtected')
	async setRoomProtected(@MessageBody() data: {roomName: string, password: string}, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		if (!this.chatService.isAdmin(data.roomName, userId))
			throw new HttpException('Admin rights required', HttpStatus.UNAUTHORIZED);
		const room = await this.roomService.findByName(data.roomName);
		await this.chatService.setRoomPrivacy(room, data.password, 'protected');
		client.nsp.emit('refreshRooms');
		client.nsp.to(data.roomName).emit('refreshUser');
	}
	
	@SubscribeMessage('setRoomPublic')
	async setRoomPublic(@MessageBody() roomName: string, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		if (!this.chatService.isAdmin(roomName, userId))
			throw new HttpException('Admin rights required', HttpStatus.UNAUTHORIZED);
		const room = await this.roomService.findByName(roomName);
		await this.chatService.setRoomPrivacy(room, null, 'public');
		client.nsp.emit('refreshRooms');
		client.nsp.to(roomName).emit('refreshUser');
	}

	@SubscribeMessage('sendMessage')
	async sendMessage(@MessageBody() data: {roomName: string, receiverId: number, message: string}, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		const user = await this.usersService.findById(userId)
		if (await this.chatService.isBanned(data.roomName, userId)) {
			this.logger.log(`${user.username} is banned from: ${data.roomName}`);
			client.nsp.to(client.id).emit('banned', data.roomName);
			return false;
		}
		if (await this.chatService.isBlocked(userId, data.receiverId)) {
			this.logger.log(`${data.receiverId} is blocked from: ${user.username}`);
			client.nsp.to(client.id).emit('blocked');
			return false;
		}
		if (await this.chatService.isMuted(userId, data.roomName)) {
			this.logger.log(`${user.username} is muted in: ${data.roomName}`);
			client.nsp.to(client.id).emit('muted', data.roomName);
			return false;
		}
		await this.chatService.createMessage(data.roomName, user.id, data.message);
		client.nsp.to(data.roomName).emit('refreshCurrentRoom', data.roomName);
	}

	@SubscribeMessage('banUser')
	async banUser(@MessageBody() data: {roomName: string, banUserId: number}, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		if (!this.chatService.isAdmin(data.roomName, userId))
			throw new HttpException('Admin rights required', HttpStatus.UNAUTHORIZED);
		const banUser = await this.usersService.findById(data.banUserId);
		await this.chatService.leaveRoom(data.roomName, data.banUserId);
		await this.chatService.banUserFromRoom(data.roomName, data.banUserId);
		await this.chatService.createBotMessage(data.roomName, `${banUser.username} got banned from group!`);
		client.nsp.to(data.roomName).emit('refreshCurrentRoom', data.roomName);
		const allClients: any[] = await this.server.fetchSockets()
		const otherClient: Socket | undefined = allClients.find(client => Number(client.handshake.headers.authorization) == data.banUserId);
		client.nsp.to(otherClient.id).emit('banned', data.roomName)
	}

	@SubscribeMessage('unbanUser')
	async unbanUser(@MessageBody() data: {roomName: string, banUserId: number}, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		if (!this.chatService.isAdmin(data.roomName, userId))
			throw new HttpException('Admin rights required', HttpStatus.UNAUTHORIZED);
		await this.chatService.unBanUserFromRoom(data.roomName, data.banUserId);
		client.nsp.to(data.roomName).emit('refreshCurrentRoom', data.roomName);
		client.nsp.to(data.roomName).emit('refreshRooms', data.roomName);
	}

	@SubscribeMessage('muteUser')
	async muteUser(@MessageBody() data: {roomName: string, newMutedId: number, muteTimeInMinutes: number}, @ConnectedSocket() client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		if (!this.chatService.isAdmin(data.roomName, userId))
			throw new HttpException('Admin rights required', HttpStatus.UNAUTHORIZED);
		const room = await this.roomService.findByName(data.roomName);
		const user = await this.usersService.findById(data.newMutedId);
		if (!user)
			throw new HttpException('user not found', HttpStatus.NOT_FOUND);
		if (!room)
			throw new HttpException('room not found', HttpStatus.NOT_FOUND);
		if (room.roomMutedUsers.find(e => e.userId === user.id))
			throw new HttpException('user already muted', HttpStatus.CONFLICT);
		await this.chatService.createBotMessage(data.roomName, `${user.username} got muted for ${data.muteTimeInMinutes} minutes!`);
		client.nsp.to(data.roomName).emit('refreshCurrentRoom', data.roomName);
		return await this.mutedService.createMuted(user, room, data.muteTimeInMinutes);
	}

	@SubscribeMessage('findGroupRooms')
	async findGroupRooms() {
		return await this.roomService.findGroups();
	}

	@SubscribeMessage('findRoomByName')
	async findRoomByName(@MessageBody() roomName: string) {
		return await this.roomService.findByName(roomName);
	}
}
