import { Skeleton } from '@/components/server.index';

export const AgencySettingsLoader = () => {
  return (
    <section className="space-y-12">
      <div className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="w-1/2 h-8" />
          <Skeleton className="w-1/4 h-4" />
        </div>
        <Skeleton className="w-full h-0.5" />
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="w-1/2 h-8" />
          <Skeleton className="w-1/4 h-4" />
        </div>
        <Skeleton className="w-full h-0.5" />
      </div>
    </section>
  );
};
