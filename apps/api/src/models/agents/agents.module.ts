import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity } from './entities/agent.entity';
import { UsersModule } from '../users/users.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AgencyGroupsModule } from '../agency-groups/agency-groups.module';
import { TicketEntity } from '../tickets/entities/ticket.entity';

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
