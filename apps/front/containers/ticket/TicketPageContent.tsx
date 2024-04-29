'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
} from '@/components/server.index';
import { useGetTicket } from '@/hooks/tickets/useGetTicket';
import { formatDate } from '@/utils';
import { TicketMessageContainer } from './message/TicketMessageContainer';
import { Wysywig } from '@/components/client.index';

export const TicketPageContent = ({ ticketId }: { ticketId: string }) => {
  const { data: ticket, isLoading, isError } = useGetTicket({ ticketId });

  if (isLoading || !ticket) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>Une erreur est survenue lors de la récupération du ticket.</div>
    );
  }

  return (
    <div className="flex justify-between">
      <div className="space-y-8 w-9/12">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Discussions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage> {ticket.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-y-6">
          <h1 className="line-clamp-1 text-xl font-bold" title={ticket.title}>
            {ticket.title}
          </h1>

          <small className="text-gray-900">
            Créer le {formatDate(ticket.created_at)}
          </small>
        </div>

        <Separator />

        <div>
          {ticket.messages.map((message) => (
            <TicketMessageContainer key={message.id} message={message} />
          ))}
          <div className="w-full ">
            <Wysywig
              wysiwygParams={{
                autofocus: true,
                placeholder: 'Répondre...',
                wysiwygClassName:
                  'p-4 min-h-[200px] rounded-md border border-primary-500',
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-8 flex-1"></div>
    </div>
  );
};
