import { Injectable } from '@nestjs/common';
import { CreateTicketSubjectDto } from './dto/create-ticket-subject.dto';
import { TicketSubjectEntity } from './entities/ticket-subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketSubjectsService {
  constructor(
    // REPOSITORIES
    @InjectRepository(TicketSubjectEntity)
    private readonly ticketSubjectRepository: Repository<TicketSubjectEntity>,
  ) {}
  create(id: string, createTicketSubjectDto: CreateTicketSubjectDto) {
    const ticketSubject = this.ticketSubjectRepository.create({
      ...createTicketSubjectDto,
      ticket_subject_category: { id },
    });

    return this.ticketSubjectRepository.save(ticketSubject);
  }
}
