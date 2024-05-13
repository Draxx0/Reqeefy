import { QueryParams } from './common';

export interface ProjectsQueryParams extends QueryParams {
  sort_by?: 'name' | 'created_at' | 'updated_at';
}
