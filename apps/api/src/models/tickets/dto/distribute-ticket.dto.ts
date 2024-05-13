import { IsArray, IsNotEmpty } from 'class-validator';

export class DistributeTicketDTO {
  @IsNotEmpty()
  @IsArray()
  agent_groups_ids: string[];
}
