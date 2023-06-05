import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreController } from './score.controller';
import { Score } from './score.entity';
import { ScoreService } from './score.service';
import { UsersModule } from 'src/Users.module';
import { User } from 'src/Users.entity';

@Module ({
	imports: 
	[
        UsersModule,
        TypeOrmModule.forFeature([Score, User])
    ],
    providers: [ScoreService],
    controllers: [ScoreController],
    exports: [ScoreService]
})

export class ScoreModule {}