'use client';

import { AgencySettingsAccountContent } from '@/components/client.index';
import { AgencyAccountSettingsLoader } from '@/containers/loading-state';
import { useGetAgency } from '@/hooks';

export const AgencySettingsAccount = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading || !agency) return <AgencyAccountSettingsLoader />;

  if (isError) return <div>error</div>;

  return (
    <section className="space-y-12">
      <AgencySettingsAccountContent agency={agency} />
    </section>
  );
};
