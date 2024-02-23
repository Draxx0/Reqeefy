import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginateQueries } from 'src/models/common/queries/pagination.queries';

export class ProjectQueries extends PaginateQueries {
  @IsOptional()
  @IsNotEmpty()
  search?: string;

  @IsOptional()
  @IsIn(['created_at', 'updated_at'])
  sort_by?: 'created_at' | 'updated_at';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sort_order?: 'ASC' | 'DESC';
}
