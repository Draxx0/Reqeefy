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

@Injectable()
export class AgenciesService {
  constructor(
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
    private readonly authenticationService: AuthenticationService,
    private readonly paginationService: PaginationService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(queries: AgencyQueries) {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;

    const query = this.agencyRepository.createQueryBuilder('agency');

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
    const agency = this.agencyRepository.create({
      ...body,
      users: [signedUser],
    });
    return await this.agencyRepository.save(agency);
  }

  async createWithExistingUser(
    id: string,
    body: CreateAgencyWithExistingUserDto,
  ) {
    const user = await this.usersService.findOneById(id);

    const agency = this.agencyRepository.create({
      ...body,
      users: [user],
    });

    return await this.agencyRepository.save(agency);
  }
}
