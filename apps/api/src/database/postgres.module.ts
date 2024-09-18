import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'config/config';
import { prepareValidateEnv } from 'libs/utils/src/validate-env';
import { envSchema } from '../schemas/server-env.schema';

@Module({
  imports: [
    ConfigModule.forRoot(
      process.env.NODE_ENV === 'development'
        ? {
            envFilePath: `${process.cwd()}/config/env/.env.development`,
            load: [configuration],
            validate: prepareValidateEnv(envSchema),
            isGlobal: true,
          }
        : {
            ignoreEnvFile: true,
            isGlobal: true,
          },
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/../models/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: process.env.NODE_ENV === 'development' ? false : true,
    }),
  ],
})
export class PostgresModule {}
