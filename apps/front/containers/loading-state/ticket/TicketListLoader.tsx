import { Spinner } from '../common/Spinner';

export const TicketListLoader = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Spinner />
    </div>
  );
};
