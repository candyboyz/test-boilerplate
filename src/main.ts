import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.setGlobalPrefix('api');

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        })
    );

    app.enableCors({ origin: 'https://localhost:5173', credentials: true });

    const swaggerConfig = new DocumentBuilder().setTitle('Reon Test API').setVersion('1.0.0').build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('docs', app, document);

    await app.listen(config.get<number>('PORT') ?? 3000);
}
bootstrap();

