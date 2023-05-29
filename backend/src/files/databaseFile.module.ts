import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseFile from "./databaseFile.entity";
import DatabaseFilesService from "./databaseFiles.service";
import DatabaseFilesController from "./databaseFiles.controller";

@Module({
	imports: [TypeOrmModule.forFeature([DatabaseFile])],
	providers: [DatabaseFilesService],
	controllers: [DatabaseFilesController],
	exports: [DatabaseFilesService],
})
export class DatabaseFileModule {}