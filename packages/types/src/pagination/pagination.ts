export interface PaginatedData<T> {  pagination: Pagination;
  data: T[] | null;
}

interface Pagination {
  total: number;
  total_pages: number;
  page: number;
  nextPage: number | null;
  previousPage: number | null;
}
