import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AgencyGroupsModule } from '../agency-groups/agency-groups.module';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { UsersModule } from '../users/users.module';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { AgentEntity } from './entities/agent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgentEntity, TicketEntity]),
    PaginationModule,
    AuthenticationModule,
    UsersModule,
    AgencyGroupsModule,
  ],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
