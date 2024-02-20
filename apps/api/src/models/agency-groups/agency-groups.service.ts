import { Injectable } from '@nestjs/common';
import { CreateAgencyGroupDto } from './dto/create-agency-group.dto';
import { UpdateAgencyGroupDto } from './dto/update-agency-group.dto';

@Injectable()
export class AgencyGroupsService {
  create(createAgencyGroupDto: CreateAgencyGroupDto) {
    return 'This action adds a new agencyGroup';
  }

  findAll() {
    return `This action returns all agencyGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agencyGroup`;
  }

  update(id: number, updateAgencyGroupDto: UpdateAgencyGroupDto) {
    return `This action updates a #${id} agencyGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} agencyGroup`;
  }
}
