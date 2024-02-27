import { Module } from '@nestjs/common';
import { TicketSubjectCategoriesService } from './ticket-subject-categories.service';
import { TicketSubjectCategoriesController } from './ticket-subject-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketSubjectCategoryEntity } from './entities/ticket-subject-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketSubjectCategoryEntity])],
  controllers: [TicketSubjectCategoriesController],
  providers: [TicketSubjectCategoriesService],
})
export class TicketSubjectCategoriesModule {}
