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
import { Lock } from 'lucide-react';
import { TicketMessageSendForm } from '@/components/client.index';

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
            {ticket.distributed ? (
              <TicketMessageSendForm ticketId={ticketId} />
            ) : (
              <div className="p-4 flex justify-center items-center min-h-[200px] rounded-md border border-primary-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary-700" />
                  <p className="text-gray-900">
                    Veuillez attendre la distribution cette discussion à notre
                    équipe de support.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8 flex-1">Ticket infos side</div>
    </div>
  );
};
