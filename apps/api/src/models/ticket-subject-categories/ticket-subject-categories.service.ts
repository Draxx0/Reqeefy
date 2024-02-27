import { Injectable } from '@nestjs/common';
import { CreateTicketSubjectCategoryDto } from './dto/create-ticket-subject-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketSubjectCategoryEntity } from './entities/ticket-subject-category.entity';
import { Repository } from 'typeorm';
import { TicketSubjectCategoriesQueries } from './queries/queries';
import { PaginationService } from '../common/models/pagination/pagination.service';

@Injectable()
export class TicketSubjectCategoriesService {
  constructor(
    @InjectRepository(TicketSubjectCategoryEntity)
    private readonly ticketSubjectCategoryRepository: Repository<TicketSubjectCategoryEntity>,
    private readonly paginationService: PaginationService,
  ) {}
  async create(id: string, body: CreateTicketSubjectCategoryDto) {
    const ticketSubjectCategory = this.ticketSubjectCategoryRepository.create({
      ...body,
      project: { id },
    });

    return this.ticketSubjectCategoryRepository.save(ticketSubjectCategory);
  }

  async findAll(queries: TicketSubjectCategoriesQueries, projectId: string) {
    const { limit_per_page = 10, page = 1, search } = queries;
    const query = this.ticketSubjectCategoryRepository
      .createQueryBuilder('ticketSubjectCategory')
      .leftJoinAndSelect(
        'ticketSubjectCategory.ticket_subjects',
        'ticket_subjects',
      )
      .where('ticketSubjectCategory.project.id = :projectId', { projectId });

    if (search) {
      query.where('ticketSubjectCategory.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [ticketSubjectCategories, total] = await query
      .skip((page - 1) * limit_per_page)
      .take(limit_per_page)
      .getManyAndCount();

    return this.paginationService.paginate<TicketSubjectCategoryEntity>({
      page,
      total,
      limit_per_page,
      data: ticketSubjectCategories,
    });
  }
}
