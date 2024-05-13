import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // useFactory: (configService: ConfigService) => ({
      //   type: 'postgres',
      //   host: configService.get('POSTGRES_HOST'),
      //   port: configService.get('POSTGRES_PORT'),
      //   username: configService.get('POSTGRES_USERNAME'),
      //   password: configService.get('POSTGRES_PASSWORD'),
      //   database: configService.get('POSTGRES_DATABASE'),
      //   entities: [__dirname + '/../models/**/*.entity{.ts,.js}'],
      //   synchronize: true,
      // }),
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/../models/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: true,
    }),
  ],
})
export class PostgresModule {}
