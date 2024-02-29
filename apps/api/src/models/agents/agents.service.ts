import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentRole, PaginatedData } from '@reqeefy/types';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { AuthenticationSignupDto } from 'src/authentication/dto/authentication-signup.dto';
import { Repository } from 'typeorm';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { UsersService } from '../users/users.service';
import { AddAgentToAgencyDTO, CreateAgentDTO } from './dto/create-agent.dto';
import { AgentEntity } from './entities/agent.entity';
import { AgentQueries } from './queries/queries';

@Injectable()
export class AgentsService {
  constructor(
    // REPOSITORIES
    @InjectRepository(AgentEntity)
    private readonly agentRepository: Repository<AgentEntity>,
    // SERVICES
    private readonly userService: UsersService,
    private readonly paginationService: PaginationService,
    private readonly authenticationService: AuthenticationService,
  ) {}
  async create({ id, role }: { id: string; role: AgentRole }) {
    const user = await this.userService.findOneById(id);
    const agent = this.agentRepository.create({
      user,
      role,
    });

    return this.agentRepository.save(agent);
  }

  async createUserAgent(body: CreateAgentDTO, id: string) {
    const createUserBody: AuthenticationSignupDto = {
      email: body.email,
      password: body.password,
      first_name: body.first_name,
      last_name: body.last_name,
    };

    const user = await this.authenticationService.signup(createUserBody);

    const updatedUser =
      await this.userService.updateUserAndInsertAgencyRelation(user, id);

    const agent = this.agentRepository.create({
      user: updatedUser,
      role: body.role,
    });

    return this.agentRepository.save(agent);
  }

  async createExistingUserAgent(body: AddAgentToAgencyDTO, id: string) {
    const user = await this.userService.findOneById(id);

    const agent = this.agentRepository.create({
      user,
      role: body.role,
    });

    return this.agentRepository.save(agent);
  }

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
      .leftJoinAndSelect('agent.user', 'user');

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
}
