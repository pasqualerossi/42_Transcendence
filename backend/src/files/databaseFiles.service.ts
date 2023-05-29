import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import DatabaseFile from './databaseFile.entity';
import * as fs from 'fs';

@Injectable()
class DatabaseFilesService implements OnModuleInit {
	constructor(
		@InjectRepository(DatabaseFile)
		private databaseFilesRepository: Repository<DatabaseFile>,
	) {}

	async onModuleInit() {
		const DatabaseFile = await this.databaseFilesRepository.findOne(
			{ where:
				{ id: 1 }
			}
		)

		if (DatabaseFile === null)
		{
			var picture = fs.readFileSync('./uploads/default-avatar.png')
			this.uploadDatabaseFile(picture, "default")
		}
	}

	async findById(id: number)
	{
		return await this.databaseFilesRepository.findOne(
			{ where:
				{ id: id }
			}
		)
	}

	async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
		const newFile = await this.databaseFilesRepository.create({
			filename,
			data: dataBuffer
		})
		await this.databaseFilesRepository.save(newFile);
		return newFile;
	}

	async getFileById(Fileid: number) {
		const file = await this.databaseFilesRepository.findOne(
			{ where:
				{ id: Fileid }
			}
		);
		if (!file) {
			throw new NotFoundException();
		}
		return file;
	}

	async uploadDatabaseFileWithQueryRunner(dataBuffer: Buffer, filename: string, queryRunner: QueryRunner) {
		const newFile = await queryRunner.manager.create(DatabaseFile, {
			filename,
			data: dataBuffer
		})
		await queryRunner.manager.save(DatabaseFile, newFile);
		return newFile;
	}

	async deleteFileWithQueryRunner(fileId: number, queryRunner: QueryRunner) {
		const deleteResponse = await queryRunner.manager.delete(DatabaseFile, fileId);
		if (!deleteResponse.affected) {
			throw new NotFoundException();
		}
	}
}

export default DatabaseFilesService;