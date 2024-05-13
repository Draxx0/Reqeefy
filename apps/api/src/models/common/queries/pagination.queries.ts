import { IsNotEmpty, IsOptional } from 'class-validator';

export class PaginateQueries {
  @IsOptional()
  @IsNotEmpty()
  page?: number;

  @IsOptional()
  @IsNotEmpty()
  limit_per_page?: number;
}
