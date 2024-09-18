import { TicketStatus } from '@reqeefy/types';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginateQueries } from '../../../models/common/queries/pagination.queries';

export class TicketQueries extends PaginateQueries {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['created_at', 'updated_at'])
  sort_by?: 'created_at' | 'updated_at';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sort_order?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  agency_group_name?: string;

  @IsOptional()
  @IsString()
  status?: TicketStatus | 'not_archived';
}
