import { IsUUID } from 'class-validator';

export class UpdateAgentAgencyGroupDTO {
  @IsUUID()
  agency_group_id: string;
}
