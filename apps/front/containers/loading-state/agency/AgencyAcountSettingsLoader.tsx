import { ButtonSkeleton } from '../common/ButtonSkeleton';
import { DataTableSkeleton } from '../common/DataTableSkeleton';
import { PageHeaderSkeleton } from '../common/PageHeaderSkeleton';

export const AgencyAccountSettingsLoader = () => {
  return (
    <section className="space-y-12">
      <PageHeaderSkeleton />

      <PageHeaderSkeleton hasSeparator={false} />

      <div className="flex justify-end gap-4">
        <ButtonSkeleton />
        <ButtonSkeleton />
      </div>

      <DataTableSkeleton />

      <PageHeaderSkeleton hasSeparator={false} />

      <div className="flex justify-end gap-4">
        <ButtonSkeleton />
        <ButtonSkeleton />
      </div>

      <DataTableSkeleton />
    </section>
  );
};
