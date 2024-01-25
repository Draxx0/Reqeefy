import { Injectable } from '@nestjs/common';
import { PaginatedData } from '@reqeefy/types';

@Injectable()
export class PaginationService {
  paginate<T>({
    page,
    limit_per_page,
    total,
    data,
  }: {
    page: number;
    limit_per_page: number;
    total: number;
    data: T[];
  }): PaginatedData<T> {
    const total_pages = Math.ceil(total / limit_per_page);
    const nextPage = page < total_pages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;
    const offset = (page - 1) * limit_per_page;
    const paginatedData = data.slice(offset, offset + limit_per_page);

    return {
      pagination: {
        total,
        total_pages,
        page,
        nextPage,
        previousPage,
      },
      data: paginatedData,
    };
  }
}
