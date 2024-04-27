import { Timestamps } from '../common';
import { Message } from '../message/message';
import { Project } from '../project/project';
import { Agent } from '../user/agent';
import { Customer } from '../user/customer';
import { TicketPriority, TicketStatus } from './enum';

export interface Ticket extends Timestamps {
  id: string;
  title: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  messages: Array<Message>;
  support_agents: Array<Agent>;
  referent_agents: Array<Agent>;
  customers: Array<Customer> | null;
  project: Project;
  distributed: boolean;
}
