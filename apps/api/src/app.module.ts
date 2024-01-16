import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './database/postgres.module';
import { CoreModule } from './models/core.module';

@Module({
  imports: [PostgresModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
