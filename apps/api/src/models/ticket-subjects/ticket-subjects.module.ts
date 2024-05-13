import { Module } from '@nestjs/common';
import { TicketSubjectsService } from './ticket-subjects.service';
import { TicketSubjectsController } from './ticket-subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketSubjectEntity } from './entities/ticket-subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketSubjectEntity])],
  controllers: [TicketSubjectsController],
  providers: [TicketSubjectsService],
})
export class TicketSubjectsModule {}
