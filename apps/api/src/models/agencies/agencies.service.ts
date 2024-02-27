import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { Repository } from 'typeorm';
import { AgencyGroupsService } from '../agency-groups/agency-groups.service';
import { AgentsService } from '../agents/agents.service';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { UsersService } from '../users/users.service';
import {
  CreateAgencyWithExistingUserDto,
  CreateAgencyWithNewUserDto,
} from './dto/create-agency.dto';
import { AgencyEntity } from './entities/agency.entity';
import { AgencyQueries } from './queries/queries';

@Injectable()
export class AgenciesService {
  constructor(
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly agencyGroupsService: AgencyGroupsService,
    private readonly paginationService: PaginationService,
    private readonly agentService: AgentsService,
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
      .leftJoinAndSelect('agency.users', 'users')
      .leftJoinAndSelect('agency.agency_photo', 'agency_photo')
      .leftJoinAndSelect('agency.agency_groups', 'agency_groups')
      .leftJoinAndSelect('agency.projects', 'projects');

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

  async findOneById(id: string) {
    const query = this.agencyRepository
      .createQueryBuilder('agency')
      .leftJoinAndSelect('agency.users', 'users')
      .leftJoinAndSelect('agency.agency_photo', 'agency_photo')
      .leftJoinAndSelect('agency.agency_groups', 'agency_groups')
      .leftJoinAndSelect('agency.projects', 'projects')
      .where('agency.id = :id', { id });

    return await query.getOne();
  }

  async createWithNewUser(body: CreateAgencyWithNewUserDto) {
    const {
      email,
      first_name,
      last_name,
      password,
      activity_area,
      description,
      name,
      website_url,
    } = body;
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
      activity_area,
      description,
      name,
      website_url,
      users: [updatedUser],
    });
    return await this.agencyRepository.save(agency);
  }

  async createWithExistingUser(
    id: string,
    body: CreateAgencyWithExistingUserDto,
  ) {
    const { activity_area, description, name, website_url, agency_groups } =
      body;
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
      activity_area,
      description,
      name,
      website_url,
      users: [updatedUser],
    });

    const createdGroups = await Promise.all(
      agency_groups.map((group_name) =>
        this.agencyGroupsService.create({
          name: group_name,
          agencyId: agency.id,
        }),
      ),
    );

    agency.agency_groups = createdGroups;

    return await this.agencyRepository.save(agency);
  }
}
