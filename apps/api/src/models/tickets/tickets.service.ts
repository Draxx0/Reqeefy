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
import { AgencyGroupEntity } from '../agency-groups/entities/agency-group.entity';
import { DistributeTicketDTO } from './dto/distribute-ticket.dto';
import { AgencyGroupsService } from '../agency-groups/agency-groups.service';
import { AgentsService } from '../agents/agents.service';

@Injectable()
export class TicketsService {
  constructor(
    // REPOSITORIES
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectRepository(AgencyGroupEntity)
    private readonly agencyGroupRepository: Repository<AgencyGroupEntity>,
    // SERVICES
    private readonly messageService: MessagesService,
    private readonly paginationService: PaginationService,
    private readonly customerService: CustomersService,
    private readonly agencyGroupsService: AgencyGroupsService,
    private readonly agentsService: AgentsService,
  ) {}

  async findAllDistributedByAgency(
    queries: TicketQueries,
    agencyId: string,
    userId: string,
  ) {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
      agency_group_name,
    } = queries;

    const user = await this.agentsService.findOneByUserId(userId);

    const query = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.customers', 'customers')
      .leftJoinAndSelect('ticket.support_agents', 'support_agents')
      .leftJoinAndSelect('ticket.subject', 'subject')
      .leftJoinAndSelect('ticket.messages', 'messages')
      .leftJoinAndSelect('ticket.agency_groups', 'agency_groups')
      .leftJoinAndSelect('messages.user', 'user')
      .leftJoinAndSelect('messages.upload_files', 'upload_files')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('ticket.project', 'project')
      .leftJoinAndSelect('project.agents_referents', 'agents_referents')
      .where('project.agency = :agencyId', { agencyId })
      .andWhere('ticket.status != :archived', { archived: 'archived' })
      .andWhere('ticket.distributed = :distributed', { distributed: true });

    if (search) {
      query.andWhere('ticket.title LIKE :search', { search: `%${search}%` });
    }

    const projectIds = user.projects_referents.map((project) => project.id);
    const conditions = [];

    if (projectIds.length > 0) {
      conditions.push('project.id IN (:...projects)');
      query.setParameter('projects', projectIds);
    }

    if (agency_group_name) {
      const agencyGroup = await this.agencyGroupRepository.findOne({
        where: { name: agency_group_name, agency: { id: agencyId } },
      });

      if (!agencyGroup) {
        throw new HttpException('Agency group not found', HttpStatus.NOT_FOUND);
      }

      conditions.push('agency_groups.id = :agencyGroupId');
      query.setParameter('agencyGroupId', agencyGroup.id);
    }

    if (conditions.length > 0) {
      query.andWhere(`(${conditions.join(' OR ')})`);
    }

    const [tickets, total] = await query
      .skip((page - 1) * limit_per_page)
      .orderBy(`ticket.${sort_by}`, sort_order)
      .take(limit_per_page)
      .getManyAndCount();

    tickets.forEach((ticket) => ticket.sortMessages());

    return this.paginationService.paginate<TicketEntity>({
      page,
      total,
      limit_per_page,
      data: tickets,
    });
  }

  async findAllToDistributeByAgency(queries: TicketQueries, agencyId: string) {
    const {
      page = 1,
      limit_per_page = 10,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;

    const query = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.customers', 'customers')
      .leftJoinAndSelect('ticket.support_agents', 'support_agents')
      .leftJoinAndSelect('ticket.subject', 'subject')
      .leftJoinAndSelect('ticket.messages', 'messages')
      .leftJoinAndSelect('messages.user', 'user')
      .leftJoinAndSelect('messages.upload_files', 'upload_files')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('ticket.project', 'project')
      .where('project.agency = :agencyId', { agencyId })
      .andWhere('ticket.status != :archived', { archived: 'archived' })
      .andWhere('ticket.distributed = :distributed', { distributed: false });

    const [tickets, total] = await query
      .skip((page - 1) * limit_per_page)
      .orderBy(`ticket.${sort_by}`, sort_order)
      .take(limit_per_page)
      .getManyAndCount();

    tickets.forEach((ticket) => ticket.sortMessages());

    return this.paginationService.paginate<TicketEntity>({
      page,
      total,
      limit_per_page,
      data: tickets,
    });
  }

  async findAllByProjects(queries: TicketQueries, projectId: string) {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
      status = 'not_archived',
    } = queries;

    const query = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.customers', 'customers')
      .leftJoinAndSelect('ticket.support_agents', 'support_agents')
      .leftJoinAndSelect('ticket.subject', 'subject')
      .leftJoinAndSelect('ticket.messages', 'messages')
      .leftJoinAndSelect('messages.user', 'user')
      .leftJoinAndSelect('messages.upload_files', 'upload_files')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('ticket.project', 'project')
      .where('project.id = :projectId', { projectId })
      .andWhere('ticket.distributed = :distributed', { distributed: true });

    if (search) {
      query.where('ticket.title LIKE :search', { search: `%${search}%` });
    }

    if (status) {
      if (status === 'not_archived') {
        query.andWhere('ticket.status != :archived', { archived: 'archived' });
      } else {
        query.andWhere('ticket.status = :status', { status });
      }
    }

    const [tickets, total] = await query
      .skip((page - 1) * limit_per_page)
      .orderBy(`ticket.${sort_by}`, sort_order)
      .take(limit_per_page)
      .getManyAndCount();

    tickets.forEach((ticket) => ticket.sortMessages());

    return this.paginationService.paginate<TicketEntity>({
      page,
      total,
      limit_per_page,
      data: tickets,
    });
  }

  async findOneById(id: string) {
    const ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.messages', 'messages')
      .leftJoinAndSelect('ticket.upload_files', 'upload_files')
      .leftJoinAndSelect('messages.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('messages.upload_files', 'message_upload_files')
      .leftJoinAndSelect('ticket.customers', 'customers')
      .leftJoinAndSelect('customers.user', 'customer_user')
      .leftJoinAndSelect('customer_user.avatar', 'customer_avatar')
      .leftJoinAndSelect('ticket.support_agents', 'support_agents')
      .leftJoinAndSelect('support_agents.user', 'support_agent_user')
      .leftJoinAndSelect('support_agent_user.avatar', 'support_agent_avatar')
      .leftJoinAndSelect('ticket.subject', 'subject')
      .leftJoinAndSelect('ticket.project', 'project')
      .leftJoinAndSelect('project.agents_referents', 'agents_referents')
      .leftJoinAndSelect('ticket.agency_groups', 'agency_groups')
      .where('ticket.id = :id', { id })
      .getOne();

    if (!ticket) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }

    ticket.sortMessages();

    return ticket;
  }

  async create(
    createTicketDto: CreateTicketDto,
    projectId: string,
    userId: string,
  ) {
    const { content, title } = createTicketDto;

    const customer = await this.customerService.findOneByUserId(userId);

    const newTicket = this.ticketRepository.create({
      title,
      customers: [{ id: customer.id }],
      project: { id: projectId },
    });

    const ticket = await this.ticketRepository.save(newTicket);

    const newMessage = await this.messageService.createOnTicket(
      content,
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

  async archiveTicket(ticketId: string) {
    const ticket = await this.findOneById(ticketId);

    return this.ticketRepository.save({
      ...ticket,
      status: 'archived',
      archiving_at: new Date(),
    });
  }

  async distribute(id: string, body: DistributeTicketDTO) {
    const ticket = await this.findOneById(id);

    if (ticket.distributed) {
      throw new HttpException('Ticket already distributed', 400);
    }

    const agency_groups = await this.agencyGroupsService.findByIds(
      body.agent_groups_ids,
    );

    const agentsFromAgencyGroupsSelected =
      await this.agentsService.findAllByAgencyGroups(agency_groups);

    const agents = [
      ...agentsFromAgencyGroupsSelected,
      ...ticket.project.agents_referents,
    ];

    return await this.ticketRepository.save({
      ...ticket,
      distributed: true,
      agency_groups,
      support_agents: agents,
    });
  }
}
