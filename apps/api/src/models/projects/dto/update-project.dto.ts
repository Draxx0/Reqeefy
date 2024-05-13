import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDTO } from './create-project.dto';
import { IsArray, IsOptional } from 'class-validator';
import { CustomerEntity } from 'src/models/customers/entities/customer.entity';

export class UpdateProjectDto extends PartialType(CreateProjectDTO) {
  @IsOptional()
  @IsArray()
  customers: CustomerEntity[];
}
