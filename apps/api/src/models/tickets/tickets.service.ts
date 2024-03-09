import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketQueries } from './queries/queries';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { MessagesService } from '../messages/messages.service';
import { CustomersService } from '../customers/customers.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    // REPOSITORIES
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    // SERVICES
    private readonly messageService: MessagesService,
    private readonly paginationService: PaginationService,
    private readonly customerService: CustomersService,
  ) {}

  async findAllByAgency(queries: TicketQueries, agencyId: string) {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;

    const query = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.customers', 'customers')
      .leftJoinAndSelect('ticket.support_agents', 'support_agents')
      .leftJoinAndSelect('ticket.subject', 'subject')
      .leftJoinAndSelect('ticket.messages', 'messages')
      .leftJoinAndSelect('ticket.project', 'project')
      .where('project.agency.id = :agencyId', { agencyId });

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

  async findOneById(id: string) {
    const ticket = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.messages', 'messages')
      .leftJoinAndSelect('messages.user', 'user')
      .leftJoinAndSelect('ticket.customers', 'customers')
      .leftJoinAndSelect('customers.user', 'customer_user')
      .leftJoinAndSelect('ticket.support_agents', 'support_agents')
      .leftJoinAndSelect('ticket.subject', 'subject')
      .leftJoinAndSelect('ticket.project', 'project')
      .where('ticket.id = :id', { id })
      .getOne();

    if (!ticket) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }

    return ticket;
  }

  async create(createTicketDto: CreateTicketDto, projectId: string) {
    const { userId, message, title } = createTicketDto;

    const customer = await this.customerService.findOneByUserId(userId);

    const newTicket = this.ticketRepository.create({
      title,
      customers: [{ id: customer.id }],
      project: { id: projectId },
    });

    const ticket = await this.ticketRepository.save(newTicket);

    const newMessage = await this.messageService.createOnTicket(
      message,
      ticket,
      userId,
    );

    ticket.messages = [newMessage];

    return this.ticketRepository.save(ticket);
  }

  async updateStatus(ticket: TicketEntity, user: UserEntity) {
    if (ticket.status === 'pending' && user.agent) {
      ticket.status = 'open';
      await this.ticketRepository.save(ticket);
    } else if (ticket.status === 'open' && user.customer) {
      ticket.status = 'pending';
      await this.ticketRepository.save(ticket);
    }
  }
}
