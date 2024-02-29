import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketQueries } from './queries/queries';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { MessagesService } from '../messages/messages.service';

@Injectable()
export class TicketsService {
  constructor(
    // REPOSITORIES
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    // SERVICES
    private readonly messageService: MessagesService,
    private readonly paginationService: PaginationService,
  ) {}

  async findAllByProject(queries: TicketQueries, projectId: string) {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;

    const query = this.ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.project.id = :projectId', { projectId })
      .leftJoinAndSelect('ticket.customers', 'customers')
      .leftJoinAndSelect('ticket.support_agents', 'support_agents')
      .leftJoinAndSelect('ticket.subject', 'subject')
      .leftJoinAndSelect('ticket.messages', 'messages');

    if (search) {
      query.where('ticket.title LIKE :search', { search: `%${search}%` });
    }

    const [tickets, total] = await query
      .skip((page - 1) * limit_per_page)
      .orderBy(`ticket.${sort_by}`, sort_order)
      .take(limit_per_page)
      .getManyAndCount();

    return this.paginationService.paginate<TicketEntity>({
      page,
      total,
      limit_per_page,
      data: tickets,
    });
  }

  async create(createTicketDto: CreateTicketDto, projectId: string) {
    const { customerId, message, title } = createTicketDto;

    const newMessage = await this.messageService.createOnTicket(
      message,
      customerId,
    );

    const ticket = this.ticketRepository.create({
      title,
      customers: [{ id: customerId }],
      messages: [newMessage],
      project: { id: projectId },
    });

    return this.ticketRepository.save(ticket);
  }
}
