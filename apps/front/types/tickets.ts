import { TicketStatus } from '@reqeefy/types';
import { QueryParams } from './common';
export interface TicketsQueryParams extends QueryParams {
  sort_by?: 'title' | 'created_at' | 'updated_at';
  agency_group_name?: string;
  status?: TicketStatus | 'not_archived';
}
