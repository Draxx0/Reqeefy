'use client';
import {
  Button,
  CreateTicketForm,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  PaginationComponent,
} from '@/components/client.index';
import { Input, PageHeader, Ticket } from '@/components/server.index';
import { LARGE_PAGE_SIZE, SortOrderType, sortOrderValues } from '@/constants';
import { EmptyTickets } from '@/containers/empty-state';
import { useGetTicketsByProject } from '@/hooks';
import { useAuthStore } from '@/stores';
import { ArrowDownUp, MessageCircle } from 'lucide-react';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';

export const CustomerTicketsList = () => {
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
  } = useGetTicketsByProject({
    projectId: user?.customer?.project.id,
    queryParams: {
      page: currentPage,
      limit_per_page: LARGE_PAGE_SIZE,
      sort_by: 'created_at',
      sort_order: sortOrder,
    },
  });

  if (!user?.customer) return null;

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

  return (
    <section className="space-y-12">
      <PageHeader
        title="Discussions"
        description="Postez vos questions et obtenez des réponses de la part de notre équipe !"
        hasSeparator
      />

      <div className="flex justify-between items-center">
        <Input
          searchInput
          type="text"
          placeholder="Recherche..."
          // value={searchTerm}
          // onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-3">
                Créer une discussion <MessageCircle className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl">
                  Créer une nouvelle discussion
                </DialogTitle>
                <DialogDescription className="text-gray-900">
                  Remplissez les informations nécessaires pour créer une
                  nouvelle discussion.
                </DialogDescription>
              </DialogHeader>
              <CreateTicketForm projectId={user.customer.project.id} />
            </DialogContent>
          </Dialog>
          <Button
            variant={'ghost'}
            className="flex gap-2 items-center border border-gray-700"
            onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
          >
            <span>{sortOrder === 'ASC' ? 'Plus anciens' : 'Plus récents'}</span>
            <ArrowDownUp className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {tickets.data && tickets.data.length > 0 ? (
        <>
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
        </>
      ) : (
        <EmptyTickets />
      )}
    </section>
  );
};
