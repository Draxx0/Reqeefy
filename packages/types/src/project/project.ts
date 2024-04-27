import { UploadFile } from '../upload-file';
import { ProjectStatus } from './enum';
import { Ticket, TicketSubjectCategory } from '../ticket';
import { Agent, Customer } from '../user';
import { Agency } from '../agency';
import { Timestamps } from '../common';

export interface Project extends Timestamps {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  photo_url: UploadFile;
  agents_referents: Agent[];
  tickets: Ticket[];
  customers: Customer[];
  agency: Agency;
  ticket_subject_categories: TicketSubjectCategory[];
}
