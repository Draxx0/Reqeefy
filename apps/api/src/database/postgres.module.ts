import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'config/config';
import { prepareValidateEnv } from 'libs/utils/src/validate-env';
import { envSchema } from 'src/schemas/server-env.schema';

@Module({
  imports: [
    process.env.NODE_ENV === 'staging'
      ? ConfigModule.forRoot()
      : ConfigModule.forRoot({
          envFilePath: `${process.cwd()}/config/env/.env.${process.env.NODE_ENV}`,
          load: [configuration],
          validate: prepareValidateEnv(envSchema),
        }),
    ,
    process.env.NODE_ENV === 'staging'
      ? TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USERNAME,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          entities: [__dirname + '/../models/**/*.entity{.ts,.js}'],
          synchronize: true,
          ssl: true,
        })
      : TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('POSTGRES_HOST'),
            port: configService.get('POSTGRES_PORT'),
            username: configService.get('POSTGRES_USERNAME'),
            password: configService.get('POSTGRES_PASSWORD'),
            database: configService.get('POSTGRES_DATABASE'),
            entities: [__dirname + '/../models/**/*.entity{.ts,.js}'],
            synchronize: true,
          }),
          inject: [ConfigService],
        }),
  ],
})
export class PostgresModule {}
