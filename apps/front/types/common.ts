export interface QueryParams extends PaginationQueryParams {
  search?: string;
  sort_order?: 'ASC' | 'DESC';
}

export interface PaginationQueryParams {
  page?: number;
  limit_per_page?: number;
}
