import { Skeleton } from '@/components/server.index';
import { ButtonSkeleton } from '../common/ButtonSkeleton';

export const TicketLoader = () => {
  return (
    <div className="flex justify-between gap-12">
      <div className="w-9/12">
        <div className="flex gap-3 mb-8">
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>

        <div className="space-y-6">
          <Skeleton className="w-1/2 h-6" />

          <Skeleton className="w-1/4 h-4" />
        </div>

        <Skeleton className="w-full h-0.5 my-8" />

        <ButtonSkeleton />

        <div className="flex gap-4 mt-8">
          <div className="flex flex-col items-center">
            <Skeleton className="bg-primary-500 rounded-full w-3 h-3" />
            <Skeleton className="bg-primary-500 h-full w-1" />
          </div>
          <div className="space-y-4 mb-12 w-full">
            <span className="text-gray-900 relative bottom-1.5">
              <Skeleton className="w-1/4 h-4" />
            </span>

            <div className="p-4 h-64 rounded-md shadow-md border border-primary-500 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-1/4 h-4" />
              </div>

              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>

        <div className="space-y-12 ">
          <Skeleton className="w-full h-72" />
        </div>
      </div>

      <div className="space-y-12 flex-1">
        <div className="space-y-6">
          <Skeleton className="w-2/4 h-4" />
          <Skeleton className="w-full h-0.5" />
          <Skeleton className="w-2/4 h-4 rounded-full" />
        </div>

        <div className="space-y-6">
          <Skeleton className="w-2/4 h-4" />
          <Skeleton className="w-full h-0.5" />
          <div className="flex -space-x-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>

        <div className="space-y-6">
          <Skeleton className="w-2/4 h-4" />
          <Skeleton className="w-full h-0.5" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
        </div>
      </div>
    </div>
  );
};
