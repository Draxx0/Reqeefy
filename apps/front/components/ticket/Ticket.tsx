import { Ticket as TicketType } from '@reqeefy/types';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../server.index';
import { BadgePlus, MessageCircle, Paperclip } from 'lucide-react';
import { useMemo } from 'react';
import { formatDate } from '@/utils';
import {
  Button,
  ButtonLink,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../client.index';
import { DistributeTicketForm } from './DistributeTicketForm';
import { useAuthStore } from '@/stores';

type Props = {
  ticket: TicketType;
};

export const Ticket = ({ ticket }: Props) => {
  const user = useAuthStore((state) => state.user);

  const ticketFilesCount = useMemo(() => {
    return ticket.messages.reduce(
      (acc, message) => acc + message.upload_files.length,
      0
    );
  }, [ticket.messages]);

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

  const lastMessage = ticket.messages[0];

  return (
    <div className="bg-white p-6 rounded-lg hover:shadow-primary-500 transition ease-in-out duration-300 shadow-md relative border min-h-[300px]">
      <div
        className={`absolute left-0 top-0 ${ticket.archived_at ? 'bg-gray-900' : 'bg-primary-900'} h-full w-[0.35rem] rounded-tl-lg rounded-bl-lg`}
      ></div>
      <div
        className={`absolute right-0 top-0 ${ticket.archived_at ? 'bg-gray-900' : 'bg-primary-900'} h-full w-[0.35rem] rounded-tr-lg rounded-br-lg`}
      ></div>
      <div className="flex flex-col gap-3 h-full justify-between">
        {ticket.messages.length === 1 && (
          <div className="flex items-center gap-1">
            <BadgePlus className="size-4 text-primary-700" />
            <span className="w-fit text-primary-700 text-xs font-semibold">
              Nouvelle discussion
            </span>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-xl truncate cursor-alias">{ticket.title}</p>
              </TooltipTrigger>
              <TooltipContent align="center" side="top">
                <p>{ticket.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Badge className="w-fit uppercase" variant={'outline'}>
            {ticket.project.name}
          </Badge>
        </div>

        <div className="space-y-4">
          <div
            className="line-clamp-1 text-gray-900"
            dangerouslySetInnerHTML={{
              __html: lastMessage.content,
            }}
          ></div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="w-8 h-8 rounded-full cursor-pointer group">
                    <AvatarImage
                      src={lastMessage.user.avatar?.file_url}
                      alt={`Photo de l'utiliateur ${lastMessage.user.first_name} ${lastMessage.user.last_name}`}
                      className="h-full w-full group-hover:opacity-50 transition duration-300 ease-in-out"
                    />
                    <AvatarFallback className="w-full h-full uppercase text-xs flex items-center justify-center group-hover:opacity-50 transition duration-300 ease-in-out">
                      {lastMessage.user.first_name[0] +
                        lastMessage.user.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent align="center" side="top">
                  <p>
                    {lastMessage.user.first_name} {lastMessage.user.last_name}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <p className="text-gray-900 text-sm ">
              {formatDate(lastMessage.created_at)}
            </p>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-gray-900">
                <MessageCircle className="w-[18px] h-[18px]" />
                <p>{ticket.messages.length}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-900">
                <Paperclip className="w-4 h-4" />
                <p>{ticketFilesCount}</p>
              </div>
            </div>

            <div className="flex -space-x-4 items-center">
              {ticketUsers.map((user) => (
                <TooltipProvider key={user.id} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="w-8 h-8 rounded-full cursor-pointer group">
                        <AvatarImage
                          src={user.avatar?.file_url}
                          alt={`Photo de l'utilisateur ${user.first_name} ${user.last_name}`}
                          className="h-full w-full group-hover:opacity-50 transition duration-300 ease-in-out"
                        />
                        <AvatarFallback className="w-full h-full text-xs group-hover:opacity-50 transition duration-300 ease-in-out flex items-center justify-center">
                          {user.first_name[0] + user.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent align="center" side="top">
                      <p>
                        {user.first_name} {user.last_name}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex gap-2 justify-end flex-wrap">
            {!ticket.distributed && user?.role !== 'customer' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size={'sm'} className="gap-3">
                    Distribuer
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader className="mb-4">
                    <DialogTitle className="text-2xl">Distribuer</DialogTitle>
                    <DialogDescription className="text-gray-900">
                      Veuillez sélectionner un groupe pour distribuer la
                      discussion.
                    </DialogDescription>
                  </DialogHeader>
                  <DistributeTicketForm ticketId={ticket.id} />
                </DialogContent>
              </Dialog>
            )}

            <ButtonLink size={'sm'} href={`/tickets/${ticket.id}`}>
              Voir la discussion
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
};
