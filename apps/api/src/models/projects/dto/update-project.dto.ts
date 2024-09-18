import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional } from 'class-validator';
import { CustomerEntity } from '../../../models/customers/entities/customer.entity';
import { CreateProjectDTO } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDTO) {
  @IsOptional()
  @IsArray()
  customers: CustomerEntity[];
}
