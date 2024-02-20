import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { PaginationModule } from '../common/models/pagination.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity } from './entities/agent.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgentEntity]),
    PaginationModule,
    UsersModule,
  ],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
