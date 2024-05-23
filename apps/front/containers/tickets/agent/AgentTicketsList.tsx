'use client';
import { Button, PaginationComponent } from '@/components/client.index';
import { Input, PageHeader, Ticket } from '@/components/server.index';
import { LARGE_PAGE_SIZE, SortOrderType, sortOrderValues } from '@/constants';
import { EmptyTickets } from '@/containers/empty-state';
import { GlobalError } from '@/containers/error-state';
import { AgentTicketListLoader } from '@/containers/loading-state';
import { useGetTicketsByAgency } from '@/hooks';
import { useAuthStore } from '@/stores';
import { ArrowDownUp } from 'lucide-react';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';

export const AgentTicketsList = () => {
  const user = useAuthStore((state) => state.user);

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
  } = useGetTicketsByAgency({
    agencyId: user?.agency?.id,
    queryParams: {
      page: currentPage,
      limit_per_page: LARGE_PAGE_SIZE,
      sort_by: 'created_at',
      sort_order: sortOrder,
      agency_group_name: user?.agent?.agency_group
        ? user.agent.agency_group.name
        : undefined,
    },
  });

  if (!user?.agent) return null;

  if (isLoading && !tickets) {
    return <AgentTicketListLoader />;
  }

  if (isError && !tickets) {
    return <GlobalError />;
  }

  if (!tickets) return null;

  const totalPages = Math.ceil(tickets.pagination.total / LARGE_PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <section className="space-y-12">
      <PageHeader
        title="Discussions"
        description="Répondez aux questions des clients et aidez-les à résoudre leurs problèmes !"
        hasSeparator
      />

      {tickets.data && tickets.data.length > 0 ? (
        <>
          <div className="flex gap-4 items-end sm:justify-between flex-col sm:flex-row  sm:items-center">
            <Input
              searchInput
              type="text"
              placeholder="Recherche..."
              // value={searchTerm}
              // onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className="flex justify-end gap-3">
              <Button
                variant={'ghost'}
                className="flex gap-2 items-center border border-gray-700"
                onClick={() =>
                  setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
                }
              >
                <span>
                  {sortOrder === 'ASC' ? 'Plus anciens' : 'Plus récents'}
                </span>
                <ArrowDownUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
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
        </>
      ) : (
        <EmptyTickets />
      )}
    </section>
  );
};
