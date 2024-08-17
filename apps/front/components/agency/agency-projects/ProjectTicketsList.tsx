import { EmptyTickets, GlobalError } from '@/containers';
import { useGetTicketsByProject } from '@/hooks';
import { Ticket } from '../../server.index';

export const ProjectTicketsList = ({ projectId }: { projectId: string }) => {
  //TODO Update not archived using status filter button
  const {
    data: tickets,
    isLoading,
    isError,
  } = useGetTicketsByProject({
    projectId,
    queryParams: { page: 1, sort_order: 'DESC', status: 'not_archived' },
  });

  if (isLoading && !tickets) {
    return <div>Loading...</div>;
  }

  if (isError && !tickets) {
    return <GlobalError />;
  }

  if (!tickets) return null;

  return tickets.data && tickets.data.length > 0 ? (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tickets.data.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
    </div>
  ) : (
    <EmptyTickets />
  );
};
