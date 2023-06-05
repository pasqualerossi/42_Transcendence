import { UsersService } from './users.service';
import { User } from './users.entity';
import JwtTwoFactorGuard from 'src/Authentication/TwoFactor/twoFactor.guard';
import RequestWithUser from 'src/Authentication/Interfaces/requestWithUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'

import 
{
	Controller,
	Get,
	Post,
	Body,
	Delete,
	Param,
	HttpCode,
	UseGuards,
	UseInterceptors,
	Req,
	UploadedFile,
	ClassSerialiserInterceptor,
	HttpException,
	HttpStatus
} from '@nestjs/common';

@Controller('users')
export class UserController 
{
	constructor(private readonly usersService: UsersService){}

	@Get('all')
	@UseGuards(JwtTwoFactorGuard)

	@UseInterceptors(ClassSerialiserInterceptor)
	async getAll():Promise<User[]>
	{
		return await this.usersService.findAll();
	}
	
	@Get('public')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async getPublic(@Req() request: RequestWithUser):Promise<User[]>
	{
		return await this.usersService.findAllExceptMe(request.user);
	}

	@Get('name/:username')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async getOneByUserName(@Param('username') name: string)
	{
		return await this.usersService.findByUserName(name);
	}

	@Get('id/:userId')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async getOneById(@Param('userId') id: number)
	{
		return await this.usersService.findById(id);
	}

	@Get('myuser')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	metMyUser(@Req() request: RequestWithUser)
	{
		return request.user;
	}

	@Post('add')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	@HttpCode(201)
	createUser(@Body() newUser: User)
	{
		this.usersService.create(newUser);
	}

	@Post('update/name/:username')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async updateUserName(@Req() request: RequestWithUser, @Param('username') newUserName: string) 
	{
		if (newUserName.length > 8)
			throw new HttpException('Name to long', HttpStatus.CONFLICT)
		if (newUserName.includes(' '))
			throw new HttpException('Name cant have spaces', HttpStatus.CONFLICT)
		if (!await this.usersService.updateName(request.user.id, newUserName))
			throw new HttpException('Name is taken', HttpStatus.CONFLICT)
	}

	@Delete('delete/:id')
	@HttpCode(200)
	@UseInterceptors(ClassSerialiserInterceptor)
	@UseGuards(JwtTwoFactorGuard)
	deleteUser(@Param('id') id)
	{
		this.usersService.delete(id);
	}

	@Post('avatar')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	@UseInterceptors(FileInterceptor('file'))
	async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) 
	{
		return this.usersService.addAvatar(request.user.id , file.buffer, file.originalname);
	}

	@Post('friend/add/:userId')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async sendFriendReqeuest(@Req() request: RequestWithUser, @Param('userId') id: number) 
	{
		return this.usersService.sendFriendReqeuest(request.user.id, id);
	}

	@Post('friend/remove/:userId')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async removeFriend(@Req() request: RequestWithUser, @Param('userId') id: number) {
		return this.usersService.removeFriend(request.user.id, id);
	}

	@Post('friend/accept/:userId')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async acceptFriendReqeuest(@Req() request: RequestWithUser, @Param('userId') id: number) 
	{
		return this.usersService.acceptFriendReqeuest((<User>request.user).id, id);
	}

	@Post('friend/decline/:userId')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async declineFriendReqeuest(@Req() request: RequestWithUser, @Param('userId') id: number) 
	{
		return this.usersService.declineFriendReqeuest((<User>request.user).id, id);
	}

	@Post('friend/retrieve/:userId')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async retrieveFriendReqeuest(@Req() request: RequestWithUser, @Param('userId') id: number) 
	{
		return this.usersService.retrieveFriendReqeuest((<User>request.user).id, id);
	}

	@Post('block/:userId')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async blockUser(@Req() request: RequestWithUser, @Param('userId') id: number) 
	{
		return this.usersService.blockUser((<User>request.user).id, id);
	}

	@Post('unblock/:userId')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async unblockUser(@Req() request: RequestWithUser, @Param('userId') id: number) 
	{
		return this.usersService.unblockUser((<User>request.user).id, id);
	}

	@Post('update/status/:number')
	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(ClassSerialiserInterceptor)
	async changeStatus(@Req() request: RequestWithUser, @Param('number') status: number) 
	{
		return await this.usersService.setStatus(status, request.user.id);
	}
}