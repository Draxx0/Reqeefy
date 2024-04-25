import { AgencyGroup } from '../agency';

export interface Agent {
  id: string;
  agency_groups: AgencyGroup[];
}
