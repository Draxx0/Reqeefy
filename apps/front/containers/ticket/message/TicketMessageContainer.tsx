import { Message } from '@reqeefy/types';
import { TicketMessage } from './TicketMessage';
import { formatDate } from '@/utils';

export const TicketMessageContainer = ({ message }: { message: Message }) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="bg-primary-900 rounded-full w-3 h-3 border border-primary-700"></span>
        <span className="bg-gray-700 h-full w-1"></span>
      </div>
      <div className="space-y-4 mb-12 w-full">
        <span className="text-gray-900 relative bottom-1.5">
          {formatDate(message.created_at)}
        </span>
        <TicketMessage message={message} />
      </div>
    </div>
  );
};
