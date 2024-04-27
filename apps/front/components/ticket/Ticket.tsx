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
import { MessageCircle, Paperclip } from 'lucide-react';
import { useMemo } from 'react';
import { formatDate } from '@/utils';

type Props = {
  ticket: TicketType;
  hasBadge?: boolean;
};

export const Ticket = ({ ticket, hasBadge = false }: Props) => {
  console.log(ticket);

  const ticketFilesCount = useMemo(() => {
    return ticket.messages.reduce(
      (acc, message) => acc + message.upload_files.length,
      0
    );
  }, [ticket.messages]);

  const lastMessage = ticket.messages[ticket.messages.length - 1];

  console.log(lastMessage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative border min-h-[300px]">
      <div
        className={`absolute left-0 top-0 ${lastMessage.readed ? 'bg-gray-900' : 'bg-primary-900'} h-full w-[0.35rem] rounded-tl-lg rounded-bl-lg`}
      ></div>
      <div className="flex flex-col gap-3 h-full justify-between">
        {hasBadge && (
          <div className="w-full flex justify-end">
            <Badge className="w-fit uppercase" variant={'outline'}>
              {ticket.project.name}
            </Badge>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-xl">{ticket.title}</p>

          <div
            className="line-clamp-5 text-gray-900"
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
                      src={lastMessage.user.avatar?.path}
                      alt={`Photo de l'utiliateur ${lastMessage.user.first_name} ${lastMessage.user.last_name}`}
                      className="h-full w-full group-hover:opacity-50 transition duration-300 ease-in-out"
                    />
                    <AvatarFallback className="w-full h-full text-xs flex items-center justify-center group-hover:opacity-50 transition duration-300 ease-in-out">
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
              {ticket.messages.map((message) => (
                <TooltipProvider key={message.id} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="w-8 h-8 rounded-full cursor-pointer group">
                        <AvatarImage
                          src={message.user.avatar?.path}
                          alt={`Photo de l'utilisateur ${message.user.first_name} ${message.user.last_name}`}
                          className="h-full w-full group-hover:opacity-50 transition duration-300 ease-in-out"
                        />
                        <AvatarFallback className="w-full h-full text-xs group-hover:opacity-50 transition duration-300 ease-in-out flex items-center justify-center">
                          {message.user.first_name[0] +
                            message.user.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent align="center" side="top">
                      <p>
                        {message.user.first_name} {message.user.last_name}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
