import { PartialType } from '@nestjs/mapped-types';
import { CreateAgencyGroupDTO } from './create-agency-group.dto';

export class UpdateAgencyGroupDto extends PartialType(CreateAgencyGroupDTO) {}
