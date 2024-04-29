import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/server.index';
import { Message } from '@reqeefy/types';
import Image from 'next/image';

export const TicketMessage = ({ message }: { message: Message }) => {
  return (
    <div className="space-y-6 p-4 rounded-md shadow-md border border-primary-500">
      <div className="flex items-center gap-4">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-8 h-8 rounded-full cursor-pointer group">
                <AvatarImage
                  src={message.user.avatar?.path}
                  alt={`Photo de l'utilisateur ${message.user.first_name} ${message.user.last_name}`}
                  className="h-full w-full group-hover:opacity-80 transition-opacity ease-in-out duration-300"
                />
                <AvatarFallback className="w-full h-full text-xs flex items-center justify-center group-hover:opacity-80 transition-opacity ease-in-out duration-300">
                  {message.user.first_name[0] + message.user.last_name[0]}
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

        <p>
          {message.user.first_name} {message.user.last_name}
        </p>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: message.content,
        }}
      ></div>

      {message.upload_files.length > 0 && (
        <>
          <Separator />

          <div className="space-y-4">
            {message.upload_files.map((file) => (
              <div key={file.id} className="shadow-md">
                <Image
                  src={file.path}
                  alt={file.name}
                  width={32}
                  height={32}
                  className="rounded-t-md"
                />

                <div className="space-y-2 bg-gray-900 rounded-b-md">
                  <p>{file.name}</p>
                  <small>{file.size}</small>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
