import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScoreController } from './Score.Controller';
import { Score } from './Score.Entity';
import { ScoreService } from './Score.Service';
import { UsersModule } from '../../Profile/Profile.Module';
import { User } from '../../Profile/Profile.Entity';

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