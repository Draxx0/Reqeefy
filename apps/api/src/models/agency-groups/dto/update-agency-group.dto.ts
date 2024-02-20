import { PartialType } from '@nestjs/mapped-types';
import { CreateAgencyGroupDto } from './create-agency-group.dto';

export class UpdateAgencyGroupDto extends PartialType(CreateAgencyGroupDto) {}
