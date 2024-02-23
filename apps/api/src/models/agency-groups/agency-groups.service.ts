import { Injectable } from '@nestjs/common';
import { CreateAgencyGroupDTO } from './dto/create-agency-group.dto';
import { AgencyGroupEntity } from './entities/agency-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AgencyGroupsService {
  constructor(
    @InjectRepository(AgencyGroupEntity)
    private readonly agencyGroupRepository: Repository<AgencyGroupEntity>,
  ) {}

  async findAll() {
    const query = this.agencyGroupRepository
      .createQueryBuilder('agency_group')
      .leftJoinAndSelect('agency_group.agency', 'agency');

    return await query.getMany();
  }

  create(createAgencyGroupDto: CreateAgencyGroupDTO) {
    const agencyGroup = this.agencyGroupRepository.create({
      ...createAgencyGroupDto,
      agency: { id: createAgencyGroupDto.agencyId },
    });

    return this.agencyGroupRepository.save(agencyGroup);
  }
}
