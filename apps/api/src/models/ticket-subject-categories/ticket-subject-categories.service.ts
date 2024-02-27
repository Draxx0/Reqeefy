import { Injectable } from '@nestjs/common';
import { CreateTicketSubjectCategoryDto } from './dto/create-ticket-subject-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketSubjectCategoryEntity } from './entities/ticket-subject-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketSubjectCategoriesService {
  constructor(
    @InjectRepository(TicketSubjectCategoryEntity)
    private readonly ticketSubjectCategoryRepository: Repository<TicketSubjectCategoryEntity>,
  ) {}
  async create(id: string, body: CreateTicketSubjectCategoryDto) {
    const ticketSubjectCategory = this.ticketSubjectCategoryRepository.create({
      ...body,
      project: { id },
    });

    return this.ticketSubjectCategoryRepository.save(ticketSubjectCategory);
  }

  findAll() {
    return `This action returns all ticketSubjectCategories`;
  }
}
