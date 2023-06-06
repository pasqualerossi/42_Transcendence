import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import DatabaseFile from "./DatabaseFile.Entity";
import DatabaseFilesService from "./DatabaseFile.service";
import DatabaseFilesController from "./DatabaseFile.Controller";

@Module({
	imports: [TypeOrmModule.forFeature([DatabaseFile])],
	providers: [DatabaseFilesService],
	controllers: [DatabaseFilesController],
	exports: [DatabaseFilesService],
})

export class DatabaseFileModule {}