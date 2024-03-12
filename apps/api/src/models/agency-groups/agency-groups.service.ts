import { Injectable } from '@nestjs/common';
import { CreateAgencyGroupDTO } from './dto/create-agency-group.dto';
import { AgencyGroupEntity } from './entities/agency-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationService } from '../common/models/pagination/pagination.service';

@Injectable()
export class AgencyGroupsService {
  constructor(
    // REPOSITORIES
    @InjectRepository(AgencyGroupEntity)
    private readonly agencyGroupRepository: Repository<AgencyGroupEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async findAllByAgency(agencyId: string) {
    return await this.agencyGroupRepository
      .createQueryBuilder('agency_group')
      .leftJoinAndSelect('agency_group.agency', 'agency')
      .leftJoinAndSelect('agency_group.agents', 'agents')
      .where('agency.id = :agencyId', { agencyId })
      .getMany();
  }

  create(createAgencyGroupDto: CreateAgencyGroupDTO) {
    const agencyGroup = this.agencyGroupRepository.create({
      ...createAgencyGroupDto,
      agency: { id: createAgencyGroupDto.agencyId },
    });

    return this.agencyGroupRepository.save(agencyGroup);
  }
}
