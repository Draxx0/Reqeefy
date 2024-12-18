import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedData } from '@reqeefy/types';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { AuthenticationSignupDto } from 'src/authentication/dto/authentication-signup.dto';
import { Repository } from 'typeorm';
import { AgencyGroupsService } from '../agency-groups/agency-groups.service';
import { AgencyGroupEntity } from '../agency-groups/entities/agency-group.entity';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { UsersService } from '../users/users.service';
import { CreateAgentDTO } from './dto/create-agent.dto';
import { UpdateAgentAgencyGroupDTO } from './dto/update-agent-agency-group.dto';
import { AgentEntity } from './entities/agent.entity';
import { AgentQueries } from './queries/queries';

@Injectable()
export class AgentsService {
  constructor(
    // REPOSITORIES
    @InjectRepository(AgentEntity)
    private readonly agentRepository: Repository<AgentEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    // SERVICES
    private readonly userService: UsersService,
    private readonly paginationService: PaginationService,
    private readonly authenticationService: AuthenticationService,
    private readonly agencyGroupsService: AgencyGroupsService,
  ) {}
  async create(id: string) {
    const user = await this.userService.findOneById(id);

    const agent = this.agentRepository.create({
      user,
    });

    return await this.agentRepository.save(agent);
  }

  async createUserAgent(body: CreateAgentDTO, id: string) {
    const createUserBody: AuthenticationSignupDto = {
      email: body.email,
      password: body.password,
      // password: generateRandomPassword(),
      first_name: body.first_name,
      last_name: body.last_name,
    };

    const user = await this.authenticationService.signup(createUserBody);

    const updatedUser =
      await this.userService.updateUserAndInsertAgencyRelation(
        user,
        id,
        body.role,
      );

    const agent = this.agentRepository.create({
      user: updatedUser,
      agency_group: { id: body.agency_group_id },
    });

    const agencyGroupId = body.agency_group_id;

    const persistedAgent = await this.agentRepository.save(agent);

    const tickets = await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.support_agents', 'support_agents')
      .leftJoinAndSelect('ticket.agency_groups', 'agency_group')
      .andWhere('ticket.status != :status', { status: 'archived' })
      .andWhere('agency_group.id = :agencyGroupId', { agencyGroupId })
      .getMany();

    persistedAgent.tickets_support = tickets;

    return this.agentRepository.save(persistedAgent);
  }

  // async createExistingUserAgent(body: AddAgentToAgencyDTO, id: string) {
  //   const user = await this.userService.findOneById(id);

  //   const updatedUser = await this.userService.updateSelectedOne(user, {
  //     role: body.role,
  //   });

  //   const agent = this.agentRepository.create({
  //     user: updatedUser,
  //   });

  //   return this.agentRepository.save(agent);
  // }

  async findAll(queries: AgentQueries): Promise<PaginatedData<AgentEntity>> {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;

    const query = this.agentRepository
      .createQueryBuilder('agent')
      .leftJoinAndSelect('agent.user', 'user')
      .leftJoinAndSelect('agent.agency_group', 'agency_group')
      .leftJoinAndSelect('agent.projects_referents', 'projects_referents')
      .leftJoinAndSelect('agent.tickets_support', 'tickets_support');

    if (search) {
      query.where(
        'agent.user.firstName LIKE :search OR agent.user.lastName LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    const [agents, total] = await query
      .skip((page - 1) * limit_per_page)
      .orderBy(`agent.${sort_by}`, sort_order)
      .take(limit_per_page)
      .getManyAndCount();

    return this.paginationService.paginate<AgentEntity>({
      page,
      total,
      limit_per_page,
      data: agents,
    });
  }

  async findOneById(id: string) {
    const agent = await this.agentRepository
      .createQueryBuilder('agent')
      .leftJoinAndSelect('agent.user', 'user')
      .leftJoinAndSelect('agent.agency_group', 'agency_group')
      .where('agent.id = :id', { id })
      .getOne();

    if (!agent)
      throw new HttpException('Agent not found', HttpStatus.NOT_FOUND);

    return agent;
  }

  async findOneByUserId(userId: string) {
    try {
      return await this.agentRepository
        .createQueryBuilder('agent')
        .leftJoinAndSelect('agent.user', 'user')
        .leftJoinAndSelect('agent.projects_referents', 'projects_referents')
        .where('user.id = :userId', { userId })
        .getOne();
    } catch (error) {
      throw new HttpException('Agent not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAllByIds(ids: string[]) {
    const query = this.agentRepository
      .createQueryBuilder('agent')
      .leftJoinAndSelect('agent.user', 'user');

    const users = await query
      .where('agent.user.id IN (:...ids)', { ids })
      .getMany();

    if (!users.length) throw new HttpException('Agents not found', 404);

    return users;
  }

  async findAllByAgencyGroups(agencyGroup: AgencyGroupEntity[]) {
    const query = this.agentRepository
      .createQueryBuilder('agent')
      .leftJoinAndSelect('agent.user', 'user');

    const agents = await query
      .leftJoin('agent.agency_group', 'agency_group')
      .where('agency_group.id IN (:...ids)', {
        ids: agencyGroup.map((group) => group.id),
      })
      .getMany();

    return agents;
  }

  async addAgentToAgencyGroup(
    agentId: string,
    agencyGroupId: string,
  ): Promise<void> {
    const agent = await this.findOneById(agentId);

    const agencyGroup =
      await this.agencyGroupsService.findOneById(agencyGroupId);

    await this.agentRepository.save({
      ...agent,
      agency_group: agencyGroup,
    });
  }

  async updateAgentAgencyGroup(
    agentId: string,
    { agency_group_id }: UpdateAgentAgencyGroupDTO,
  ): Promise<void> {
    const agent = await this.findOneById(agentId);

    const agencyGroup =
      await this.agencyGroupsService.findOneById(agency_group_id);

    await this.agentRepository.save({
      ...agent,
      agency_group: agencyGroup,
    });
  }
}
