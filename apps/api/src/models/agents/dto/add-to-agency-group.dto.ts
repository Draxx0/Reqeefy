import { IsArray, IsNotEmpty } from 'class-validator';

export class AddToAgencyGroupDTO {
  @IsNotEmpty()
  @IsArray()
  agency_groups_ids: string[];
}
