import { Injectable } from '@nestjs/common';
import { CreateTicketSubjectCategoryDto } from './dto/create-ticket-subject-category.dto';
import { UpdateTicketSubjectCategoryDto } from './dto/update-ticket-subject-category.dto';

@Injectable()
export class TicketSubjectCategoriesService {
  create(createTicketSubjectCategoryDto: CreateTicketSubjectCategoryDto) {
    return 'This action adds a new ticketSubjectCategory';
  }

  findAll() {
    return `This action returns all ticketSubjectCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketSubjectCategory`;
  }

  update(id: number, updateTicketSubjectCategoryDto: UpdateTicketSubjectCategoryDto) {
    return `This action updates a #${id} ticketSubjectCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketSubjectCategory`;
  }
}
