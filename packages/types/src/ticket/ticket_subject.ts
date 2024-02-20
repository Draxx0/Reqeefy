import { TicketSubjectCategory } from './ticket_subject_category';

export interface TicketSubject {
  id: string;
  title: string;
  ticketSubjectCategories: TicketSubjectCategory;
}
