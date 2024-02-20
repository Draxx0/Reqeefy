import { Injectable } from '@nestjs/common';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { AgentQueries } from './queries/queries';
import { PaginationService } from '../common/models/pagination.service';
import { AgentEntity } from './entities/agent.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentRole, PaginatedData } from '@reqeefy/types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(AgentEntity)
    private readonly agentRepository: Repository<AgentEntity>,
    private readonly userService: UsersService,
    private readonly paginationService: PaginationService,
  ) {}
  async create({ id, role }: { id: string; role: AgentRole }) {
    const user = await this.userService.findOneById(id);
    const agent = this.agentRepository.create({
      user,
      role,
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

    const [users, total] = await query
      .skip((page - 1) * limit_per_page)
      .orderBy(`user.${sort_by}`, sort_order)
      .take(limit_per_page)
      .getManyAndCount();

    return this.paginationService.paginate<AgentEntity>({
      page,
      total,
      limit_per_page,
      data: users,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} agent`;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
