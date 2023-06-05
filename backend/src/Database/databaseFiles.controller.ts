import {Controller,Get,Param,UseInterceptors,ClassSerialiserInterceptor,Res,ParseIntPipe, StreamableFile,} from '@nestjs/common';
import { Readable } from 'stream';
import { Response } from 'express';
import DatabaseFilesService from './databaseFiles.service';

@Controller('database-files')
@UseInterceptors(ClassSerialiserInterceptor)
export default class DatabaseFilesController 
{
	constructor
	(
		private readonly databaseFilesService: DatabaseFilesService
	) {}

	@Get(':id')
	async getDatabaseFileById(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) response: Response) {
	const file = await this.databaseFilesService.getFileById(id);

	const stream = Readable.from(file.data);

	response.set({
		'Content-Disposition': `inline; filename="${file.filename}"`,
		'Content-Type': 'image'
	})

	return new StreamableFile(stream);
	}
}