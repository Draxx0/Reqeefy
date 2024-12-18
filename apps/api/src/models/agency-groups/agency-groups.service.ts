import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAgencyGroupDTO } from './dto/create-agency-group.dto';
import { UpdateAgencyGroupDto } from './dto/update-agency-group.dto';
import { AgencyGroupEntity } from './entities/agency-group.entity';

@Injectable()
export class AgencyGroupsService {
  constructor(
    // REPOSITORIES
    @InjectRepository(AgencyGroupEntity)
    private readonly agencyGroupRepository: Repository<AgencyGroupEntity>,
  ) {}

  async findAllByAgency(agencyId: string) {
    return await this.agencyGroupRepository
      .createQueryBuilder('agency_group')
      .leftJoinAndSelect('agency_group.agency', 'agency')
      .leftJoinAndSelect('agency_group.agents', 'agents')
      .leftJoinAndSelect('agents.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .where('agency.id = :agencyId', { agencyId })
      .getMany();
  }

  async findOneById(id: string) {
    return this.agencyGroupRepository.findOneBy({ id });
  }

  create(body: CreateAgencyGroupDTO, agencyId: string) {
    const agencyGroup = this.agencyGroupRepository.create({
      ...body,
      agency: { id: agencyId },
    });

    return this.agencyGroupRepository.save(agencyGroup);
  }

  async findByIds(ids: string[]) {
    return await Promise.all(ids.map((id) => this.findOneById(id)));
  }

  async update(id: string, body: UpdateAgencyGroupDto) {
    return await this.agencyGroupRepository.update(id, body);
  }
}
