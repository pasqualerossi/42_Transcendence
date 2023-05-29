import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() 
{
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors({
		credentials: true,
		origin: process.env.VUE_APP_HOST_URL + ':8080',
	});
	app.use(cookieParser());

	const config = new DocumentBuilder()
		.setTitle('Transcendence')
		.setDescription('Collection of APIs')
		.setVersion('0.10')
		.build();
	
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();