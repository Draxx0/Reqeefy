'use client';
import { ButtonLink, TicketMessageSendForm } from '@/components/client.index';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
} from '@/components/server.index';
import { STATIC_PATHS } from '@/constants';
import { useGetTicket } from '@/hooks';
import { formatDate } from '@/utils';
import { Lock, Pen } from 'lucide-react';
import { GlobalError } from '../error-state';
import { TicketLoader } from '../loading-state/ticket/TicketLoader';
import { TicketSideContent } from './TicketSideContent';
import { TicketMessageContainer } from './message/TicketMessageContainer';

export const TicketPageContent = ({ ticketId }: { ticketId: string }) => {
  const { data: ticket, isLoading, isError } = useGetTicket({ ticketId });

  if (isLoading && !ticket) {
    return <TicketLoader />;
  }

  if (isError && !ticket) {
    return <GlobalError />;
  }

  if (!ticket) return null;

  console.log(ticket);

  return (
    <div className="flex justify-between gap-12">
      <div className="space-y-8 w-full md:w-9/12">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem>
              <BreadcrumbLink href={STATIC_PATHS.TICKETS}>
                Discussions
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="">
                {ticket.title.length > 50
                  ? `${ticket.title.slice(0, 50)}...`
                  : ticket.title}
              </BreadcrumbPage>
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

        {ticket.distributed && (
          <ButtonLink
            href="#message"
            variant={'ghost'}
            className="gap-3 font-medium text-primary-700"
          >
            <span>Ecrire un message</span>
            <Pen className="w-4 h-4" />
          </ButtonLink>
        )}

        <div>
          {ticket.messages.map((message) => (
            <TicketMessageContainer key={message.id} message={message} />
          ))}
          <div className="w-full ">
            {ticket.distributed && ticket.status !== 'archived' ? (
              <TicketMessageSendForm ticketId={ticketId} />
            ) : !ticket.distributed ? (
              <div className="p-4 flex justify-center items-center min-h-[200px] rounded-md border border-primary-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary-700" />
                  <p className="text-gray-900">
                    Veuillez attendre la distribution cette discussion à notre
                    équipe de support.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 flex justify-center items-center min-h-[200px] rounded-md border border-primary-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary-700" />
                  <p className="text-gray-900">
                    Cette discussion a été archivée et n&apos;accepte plus de
                    nouveaux messages.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <TicketSideContent ticket={ticket} />
    </div>
  );
};
