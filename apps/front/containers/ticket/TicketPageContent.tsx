'use client';import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/server.index';
import { useGetTicket } from '@/hooks';
import { formatDate } from '@/utils';
import { TicketMessageContainer } from './message/TicketMessageContainer';
import { Lock, Pen } from 'lucide-react';
import { ButtonLink, TicketMessageSendForm } from '@/components/client.index';
import { useMemo } from 'react';
import { STATIC_PATHS } from '@/constants';

export const TicketPageContent = ({ ticketId }: { ticketId: string }) => {
  const { data: ticket, isLoading, isError } = useGetTicket({ ticketId });

  const ticketUsers = useMemo(() => {
    if (!ticket) return [];
    return [
      ...ticket.customers.map((customer) => ({
        id: customer.id,
        avatar: customer.user.avatar,
        first_name: customer.user.first_name,
        last_name: customer.user.last_name,
        role: 'Client',
      })),
      ...ticket.support_agents.map((supportAgent) => ({
        id: supportAgent.id,
        avatar: supportAgent.user.avatar,
        first_name: supportAgent.user.first_name,
        last_name: supportAgent.user.last_name,
        role: 'Agent',
      })),
    ];
  }, [ticket]);

  if (isLoading || !ticket) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>Une erreur est survenue lors de la récupération du ticket.</div>
    );
  }

  console.log(ticket);

  //TODO Should be moved in another file
  const status: {
    label: string;
    tooltipLabel: string;
    variant: 'open_ticket' | 'pending_ticket' | 'archived_ticket';
  } =
    ticket.status === 'open'
      ? {
          label: 'Ouvert',
          tooltipLabel: 'La discussion est en attente de la réponse du client.',
          variant: 'open_ticket',
        }
      : ticket.status === 'pending'
        ? {
            label: 'En attente',
            tooltipLabel:
              "La discussion est en attente de la réponse d'un agent.",
            variant: 'pending_ticket',
          }
        : {
            label: 'Archivé',
            tooltipLabel: 'La discussion a était archivé.',
            variant: 'archived_ticket',
          };

  return (
    <div className="flex justify-between gap-12">
      <div className="space-y-8 w-9/12">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={STATIC_PATHS.TICKETS}>
                Discussions
              </BreadcrumbLink>
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

      <div className="space-y-12 flex-1 sticky top-4 h-fit">
        <div className="space-y-4">
          <h2 className="font-bold text-xl">Status</h2>
          <Separator />

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-fit h-fit">
                  <Badge
                    className="uppercase cursor-pointer"
                    variant={status.variant}
                  >
                    {status.label}
                  </Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent align="center" side="left">
                <p>{status.tooltipLabel}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-xl">Participants</h2>
          <Separator />

          <div className="flex items-center -space-x-4">
            {ticketUsers.map((user) => (
              <TooltipProvider key={user.id} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="w-8 h-8 rounded-full cursor-pointer group">
                      <AvatarImage
                        src={user.avatar?.file_url}
                        alt={`Photo de l'user ${user.first_name} ${user.last_name}`}
                        className="h-full w-full group-hover:opacity-80 transition-opacity ease-in-out duration-300"
                      />
                      <AvatarFallback className="w-full uppercase h-full text-xs flex items-center justify-center group-hover:opacity-80 transition-opacity ease-in-out duration-300">
                        {user.first_name[0] + user.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent align="center" side="top">
                    <p>
                      {user.first_name} {user.last_name} -{' '}
                      <span className="font-semibold">{user.role}</span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-xl">Pièces jointes</h2>
          <Separator />
        </div>
      </div>
    </div>
  );
};
