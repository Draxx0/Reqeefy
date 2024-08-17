import { Skeleton } from '@/components/server.index';
import { ButtonSkeleton } from '../common/ButtonSkeleton';
import { DataTableSkeleton } from '../common/DataTableSkeleton';
import { PageHeaderSkeleton } from '../common/PageHeaderSkeleton';

export const AgencySettingsLoader = () => {
  return (
    <section className="space-y-12">
      <PageHeaderSkeleton />

      <div className="flex gap-6">
        <Skeleton className="w-52 h-20" />
        <Skeleton className="w-52 h-20" />
        <Skeleton className="w-52 h-20" />
      </div>

      <div className="flex gap-6">
        <Skeleton className="w-40 h-40" />
        <div className="flex flex-col gap-4">
          <Skeleton className="w-52 h-6" />
          <Skeleton className="w-52 h-12" />
          <Skeleton className="w-72 h-6" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-0.5" />
      </div>

      <PageHeaderSkeleton hasSeparator={false} />

      <div className="flex justify-end gap-4">
        <ButtonSkeleton />
        <ButtonSkeleton />
      </div>

      <DataTableSkeleton />
    </section>
  );
};
