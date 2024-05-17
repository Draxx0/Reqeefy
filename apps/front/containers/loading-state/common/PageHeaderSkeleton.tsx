import { Skeleton } from '@/components/server.index';

export const PageHeaderSkeleton = ({
  hasSeparator = true,
}: {
  hasSeparator?: boolean;
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="w-1/2 h-8" />
        <Skeleton className="w-1/4 h-4" />
      </div>
      {hasSeparator && <Skeleton className="w-full h-0.5" />}
    </div>
  );
};
