import { Skeleton } from '@/components/server.index';
import { ButtonSkeleton } from '../common/ButtonSkeleton';
import { PageHeaderSkeleton } from '../common/PageHeaderSkeleton';

export const AgencyProjectSettingsLoader = () => {
  return (
    <section className="space-y-12">
      <PageHeaderSkeleton />

      <div className="flex justify-between">
        <ButtonSkeleton />
        <div className="flex justify-end gap-4">
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>

      <div className="grid grid-cols-3 justify-between gap-4">
        <Skeleton className=" h-64" />
        <Skeleton className=" h-64" />
        <Skeleton className=" h-64" />
      </div>
    </section>
  );
};
