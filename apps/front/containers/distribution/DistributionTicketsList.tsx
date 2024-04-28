'use client';

import { useGetDistributionTickets } from '@/hooks';
import { Ticket } from '../../components/ticket/Ticket';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';
import { LARGE_PAGE_SIZE, SortOrderType, sortOrderValues } from '@/constants';
import { PaginationComponent } from '@/components/client.index';

export const DistributionTicketsList = ({ agencyId }: { agencyId: string }) => {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  const [sortOrder, setSortOrder] = useQueryState<SortOrderType>(
    'sort_order',
    parseAsStringLiteral(sortOrderValues).withDefault('DESC')
  );

  const {
    data: tickets,
    isLoading,
    isError,
  } = useGetDistributionTickets({
    agencyId,
    queryParams: {
      page: currentPage,
      limit_per_page: LARGE_PAGE_SIZE,
      sort_by: 'created_at',
      sort_order: sortOrder,
      distributed: false,
    },
  });

  //! create a loading and error comp loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !tickets) {
    return <div>Error...</div>;
  }

  const totalPages = Math.ceil(tickets.pagination.total / LARGE_PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return tickets.data && tickets.data.length > 0 ? (
    <>
      <div className="grid grid-cols-4 gap-8">
        {tickets.data.map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  ) : (
    // Create visual for no ticket found
    <div>Aucun ticket trouvé</div>
  );
};
