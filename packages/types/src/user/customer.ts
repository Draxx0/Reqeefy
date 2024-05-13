import { Timestamps } from '../common';
import { Project } from '../project';
import { Ticket } from '../ticket';
import { User } from './user';

export interface Customer extends Timestamps {
  id: string;
  user: User;
  project: Project;
  tickets: Ticket[];
}
