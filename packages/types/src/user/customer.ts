import { Project } from '../project';
import { Ticket } from '../ticket';
import { User } from './user';

export interface Customer {
  id: string;
  user: User | null;
  projects: Project[];
  tickets: Ticket[];
}
