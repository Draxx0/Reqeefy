'use client';
import { PaginationComponent } from '@/components/client.index';
import { LARGE_PAGE_SIZE, SortOrderType, sortOrderValues } from '@/constants';
import { useGetDistributionTickets } from '@/hooks';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';
import { Ticket } from '../../components/ticket/Ticket';
import { EmptyTickets } from '../empty-state';
import { GlobalError } from '../error-state';
import { TicketListLoader } from '../loading-state';

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
    },
  });

  if (isLoading || !tickets) {
    return <TicketListLoader />;
  }

  if (isError && !tickets) {
    return <GlobalError />;
  }

  const totalPages = Math.ceil(tickets.pagination.total / LARGE_PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return tickets.data && tickets.data.length > 0 ? (
    <div>
      <div className="grid grid-cols-3 2xl:grid-cols-4 gap-8">
        {tickets.data.map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {totalPages > 1 ? (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : null}
    </div>
  ) : (
    <EmptyTickets />
  );
};
