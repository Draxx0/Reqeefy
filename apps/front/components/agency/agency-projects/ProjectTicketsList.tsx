import { Button } from '@/components/client.index';
import { EmptyTickets, GlobalError } from '@/containers';
import { useGetTicketsByProject } from '@/hooks';
import { ArrowDownUp } from 'lucide-react';
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

  //! add skeleton loader for tickets list
  if (isLoading && !tickets) {
    return <div>Loading...</div>;
  }

  if (isError && !tickets) {
    return <GlobalError />;
  }

  if (!tickets) return null;

  return tickets.data && tickets.data.length > 0 ? (
    <>
      <div className="flex justify-end">
        <Button
          variant={'ghost'}
          className="flex gap-2 items-center border border-gray-700"
        >
          <span>Plus récents</span>
          <ArrowDownUp className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.data.map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </>
  ) : (
    <EmptyTickets />
  );
};
