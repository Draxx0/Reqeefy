import { Ticket } from '../ticket/ticket';import { Agent } from '../user/agent';
import { Agency } from './agency';

export interface AgencyGroup {
  id: string;
  name: string;
  agents: Agent[];
  tickets: Ticket[];
  agency: Agency;
}
