import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import cors from 'cors';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const logger = new Logger('Bootstrap');
  app.use(
    cors({
      origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
      credentials:true
    }),
  );
  app.use(morgan('combined'));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter())

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Event Management')
    .setDescription('its even managment system ')
    .setVersion('1.0')

    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const PORT = process.env.PORT;
  await app.listen(PORT ?? 3000);
  logger.log(`server is  running at port : ${PORT}`);
}
bootstrap();
