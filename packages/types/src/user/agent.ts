import { AgencyGroup } from '../agency';import { Timestamps } from '../common';
import { Project } from '../project';
import { Ticket } from '../ticket';
import { User } from './user';

export interface Agent extends Timestamps {
  id: string;
  user: User;
  agency_group: AgencyGroup;
  projects_referents: Project[];
  tickets_support: Ticket[];
}
