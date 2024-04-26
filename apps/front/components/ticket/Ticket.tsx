import { Ticket as TicketType } from '@reqeefy/types';
import { Badge } from '../server.index';

type Props = {
  ticket: TicketType;
  hasBadge?: boolean;
};

export const Ticket = ({ ticket, hasBadge = false }: Props) => {
  console.log(ticket);
  return (
    <div className="bg-white p-2 rounded-lg shadow-md relative">
      <div className="flex flex-col gap-3">
        {hasBadge && <Badge>{ticket.project.name}</Badge>}

        <p>{ticket.title}</p>
      </div>
    </div>
  );
};
