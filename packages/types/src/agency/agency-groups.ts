import { Timestamps } from '../common';
import { Ticket } from '../ticket/ticket';
import { Agent } from '../user/agent';
import { Agency } from './agency';

export interface AgencyGroup extends Timestamps {
  id: string;
  name: string;
  agents: Agent[];
  tickets: Ticket[];
  agency: Agency;
}
