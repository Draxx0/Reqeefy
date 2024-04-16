import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { CustomersModule } from '../customers/customers.module';
import { MessagesModule } from '../messages/messages.module';
import { UsersModule } from '../users/users.module';
import { TicketEntity } from './entities/ticket.entity';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { AgencyGroupsModule } from '../agency-groups/agency-groups.module';
import { AgencyGroupEntity } from '../agency-groups/entities/agency-group.entity';
import { AgentsModule } from '../agents/agents.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity, AgencyGroupEntity]),
    MessagesModule,
    CustomersModule,
    UsersModule,
    PaginationModule,
    AgencyGroupsModule,
    AgentsModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
