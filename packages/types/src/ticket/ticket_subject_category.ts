import { Timestamps } from '../common';
import { Project } from '../project/project';
import { TicketSubject } from './ticket_subject';

export interface TicketSubjectCategory extends Timestamps {
  id: string;
  title: string;
  ticketSubject: TicketSubject;
  project: Project;
}
