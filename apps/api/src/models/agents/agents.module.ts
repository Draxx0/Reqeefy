import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { PaginationModule } from '../common/models/pagination.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity } from './entities/agent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity]), PaginationModule],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
