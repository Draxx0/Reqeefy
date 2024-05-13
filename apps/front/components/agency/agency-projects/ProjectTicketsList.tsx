import { Ticket } from '../../server.index';
import { useGetTicketsByProject } from '@/hooks';
import { EmptyTickets } from '@/containers';

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

  //! add skeleton loader for tickets list
  if (isLoading || !tickets) {
    return <div>Loading...</div>;
  }

  //! add error visual for tickets list
  if (isError) {
    return (
      <div>Une erreur est survenue lors de la récupération des tickets.</div>
    );
  }

  return tickets.data && tickets.data.length > 0 ? (
    <div className="grid grid-cols-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tickets.data.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
    </div>
  ) : (
    <EmptyTickets />
  );
};
