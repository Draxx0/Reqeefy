import { TicketEntity } from '../../models/tickets/entities/ticket.entity';

export interface TicketEmail {
  ticket: TicketEntity;
  supportAgent: {
    first_name: string;
    email: string;
  };
  link: string;
  ticketOwnerName: string;
}
