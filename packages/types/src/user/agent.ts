import { AgencyGroup } from '../agency';
import { Project } from '../project';
import { Ticket } from '../ticket';
import { User } from './user';

export interface Agent {
  id: string;
  user: User;
  agency_groups: AgencyGroup[];
  projects_referents: Project[];
  tickets_support: Ticket[];
}
