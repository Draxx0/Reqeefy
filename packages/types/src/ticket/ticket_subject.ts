import { Timestamps } from '../common';
import { TicketSubjectCategory } from './ticket_subject_category';

export interface TicketSubject extends Timestamps {
  id: string;
  title: string;
  ticketSubjectCategories: TicketSubjectCategory;
}
