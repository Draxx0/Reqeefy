import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { TicketEntity } from './entities/ticket.entity';
import { MessagesModule } from '../messages/messages.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity]),
    MessagesModule,
    CustomersModule,
    PaginationModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
