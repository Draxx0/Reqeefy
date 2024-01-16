import { Module } from '@nestjs/common';
import { TicketSubjectCategoriesService } from './ticket-subject-categories.service';
import { TicketSubjectCategoriesController } from './ticket-subject-categories.controller';

@Module({
  controllers: [TicketSubjectCategoriesController],
  providers: [TicketSubjectCategoriesService],
})
export class TicketSubjectCategoriesModule {}
