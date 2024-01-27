import { Injectable } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyEntity } from './entities/agency.entity';
import { UserEntity } from '../users/entities/user.entity';
import { AgencyQueries } from './queries/queries';
import { PaginationService } from '../common/models/pagination.service';

@Injectable()
export class AgenciesService {
  constructor(
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(body: CreateAgencyDto) {
    const agency = this.agencyRepository.create(body);

    console.log('agency', agency);

    return await this.agencyRepository.save(agency);

    // this.userRepository.create({
    //   email,
    //   password,
    //   agencies: [agency],
    // });

    // // The cascade option will automatically save the user
    // await this.userRepository.save(agency);
  }

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
}
