import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileModule } from 'src/files/databaseFile.module';
import { UserController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
	imports: [
		DatabaseFileModule,
		TypeOrmModule.forFeature([User])
	],
	providers: [UsersService],
	controllers: [UserController],
	exports: [UsersService],
})
export class UsersModule {}