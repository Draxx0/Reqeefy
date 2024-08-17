import { PageHeaderSkeleton } from '../common/PageHeaderSkeleton';
import { Spinner } from '../common/Spinner';

export const AgentTicketListLoader = () => {
  return (
    <div className="space-y-12">
      <PageHeaderSkeleton />

      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
};
