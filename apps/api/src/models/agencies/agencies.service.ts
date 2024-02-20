import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { Repository } from 'typeorm';
import { PaginationService } from '../common/models/pagination.service';
import { AgencyEntity } from './entities/agency.entity';
import { AgencyQueries } from './queries/queries';
import {
  CreateAgencyWithExistingUserDto,
  CreateAgencyWithNewUserDto,
} from './dto/create-agency.dto';
import { UsersService } from '../users/users.service';
import { AgentsService } from '../agents/agents.service';

@Injectable()
export class AgenciesService {
  constructor(
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly agentService: AgentsService,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(queries: AgencyQueries) {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;

    const query = this.agencyRepository
      .createQueryBuilder('agency')
      .leftJoinAndSelect('agency.users', 'users');

    if (search) {
      query.where('agency.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [agencies, total] = await query
      .skip((page - 1) * limit_per_page)
      .orderBy(`agency.${sort_by}`, sort_order)
      .take(limit_per_page)
      .getManyAndCount();

    return this.paginationService.paginate<AgencyEntity>({
      page,
      total,
      limit_per_page,
      data: agencies,
    });
  }

  async createWithNewUser(body: CreateAgencyWithNewUserDto) {
    const { email, first_name, last_name, password } = body;
    const signedUser = await this.authenticationService.signup({
      email,
      first_name,
      last_name,
      password,
    });

    const agent = await this.agentService.create({
      id: signedUser.id,
      role: 'superadmin',
    });
    const updatedUser = await this.usersService.updateSelectedOne(signedUser, {
      ...signedUser,
      agent,
    });

    const agency = this.agencyRepository.create({
      ...body,
      users: [updatedUser],
    });
    return await this.agencyRepository.save(agency);
  }

  async createWithExistingUser(
    id: string,
    body: CreateAgencyWithExistingUserDto,
  ) {
    const user = await this.usersService.findOneById(id);

    const agent = await this.agentService.create({
      id,
      role: 'superadmin',
    });

    const updatedUser = await this.usersService.updateSelectedOne(user, {
      ...user,
      agent,
    });

    const agency = this.agencyRepository.create({
      ...body,
      users: [updatedUser],
    });

    return await this.agencyRepository.save(agency);
  }
}
