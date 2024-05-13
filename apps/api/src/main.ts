import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

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
    origin: 'https://reqeefy-front.vercel.app',
  });

  await app.listen(Number(process.env.PORT) || 8000);
}
bootstrap();
