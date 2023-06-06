import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseFileModule } from 'src/Database/DatabaseFile.Module';
import { UserController } from './Users.Controller';
import { User } from './Users.Entity';
import { UsersService } from './Users.Service';

@Module({
	imports: 
	[
		DatabaseFileModule,
		TypeOrmModule.forFeature([User])
	],
	providers: [UsersService],
	controllers: [UserController],
	exports: [UsersService],
})

export class UsersModule {}