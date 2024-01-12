import { Project } from '../project/project';import { TicketSubject } from './ticket_subject';
export interface TicketSubjectCategory {
  id: string;
  title: string;
  ticketSubject: TicketSubject;
  project: Project;
}
