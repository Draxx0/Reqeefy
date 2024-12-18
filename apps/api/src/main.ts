import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api/v1', { exclude: ['/'] });

  app.use(helmet());

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : ['https://www.reqeefy.fr', 'https://reqeefy.fr'],
  });

  await app.listen(Number(process.env.PORT) || 8000);
}
bootstrap();
