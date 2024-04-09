import { IsArray, IsNotEmpty } from 'class-validator';

export class AddCustomersToProjectDTO {
  @IsNotEmpty()
  @IsArray()
  customers_ids: string[];
}
