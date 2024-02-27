import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginateQueries } from 'src/models/common/queries/pagination.queries';

export class TicketSubjectCategoriesQueries extends PaginateQueries {
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
