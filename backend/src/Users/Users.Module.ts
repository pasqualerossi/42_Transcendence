import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseFileModule } from 'src/Database/DatabaseFile.Module';
import { UserController } from './Users.Controller';
import { User } from './Users.Entity';
import { UsersService } from './Users.Service';

// This code defines a module in the NestJS framework that manages user-related functionality 
// and uses a TypeORM module for database operations.

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