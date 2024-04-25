import { QueryParams } from './common';

export interface ProjectQueryParams extends QueryParams {
  sort_by?: 'name' | 'created_at' | 'updated_at';
}
