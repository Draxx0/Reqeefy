import { Frown } from 'lucide-react';
import { Ticket } from '../../server.index';
import { useGetTickets } from '@/hooks';

export const ProjectTicketsList = ({ projectId }: { projectId: string }) => {
  const {
    data: tickets,
    isLoading,
    isError,
  } = useGetTickets({
    projectId,
    queryParams: { page: 1, sort_order: 'DESC' },
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
    <div className="justify-center flex items-center gap-2">
      <p>Aucun ticket pour ce projet...</p>
      <Frown className="w-4 h-4" />
    </div>
  );
};
