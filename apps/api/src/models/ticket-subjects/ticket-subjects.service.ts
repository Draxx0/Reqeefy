import { Injectable } from '@nestjs/common';
import { CreateTicketSubjectDto } from './dto/create-ticket-subject.dto';
import { UpdateTicketSubjectDto } from './dto/update-ticket-subject.dto';

@Injectable()
export class TicketSubjectsService {
  create(createTicketSubjectDto: CreateTicketSubjectDto) {
    return 'This action adds a new ticketSubject';
  }

  findAll() {
    return `This action returns all ticketSubjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketSubject`;
  }

  update(id: number, updateTicketSubjectDto: UpdateTicketSubjectDto) {
    return `This action updates a #${id} ticketSubject`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketSubject`;
  }
}
