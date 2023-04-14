import {NestFactory} from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true
    });

    const config = new DocumentBuilder()
        .setTitle('Pizza API')
        .setDescription('API доставки пиццы')
        .setVersion('1.0')
        .addTag('API')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
}

bootstrap();
