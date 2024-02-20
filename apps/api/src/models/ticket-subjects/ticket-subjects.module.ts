import { Module } from '@nestjs/common';
import { TicketSubjectsService } from './ticket-subjects.service';
import { TicketSubjectsController } from './ticket-subjects.controller';

@Module({
  controllers: [TicketSubjectsController],
  providers: [TicketSubjectsService],
})
export class TicketSubjectsModule {}
