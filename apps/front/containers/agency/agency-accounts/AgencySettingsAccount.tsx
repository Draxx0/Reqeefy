'use client';

import { AgencySettingsAccountContent } from '@/components/client.index';
import { GlobalError } from '@/containers/error-state';
import { AgencyAccountSettingsLoader } from '@/containers/loading-state';
import { useGetAgency } from '@/hooks';

export const AgencySettingsAccount = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading && !agency) return <AgencyAccountSettingsLoader />;

  if (isError && !agency) {
    return <GlobalError />;
  }

  if (!agency) return null;

  return (
    <section className="space-y-12">
      <AgencySettingsAccountContent agency={agency} />
    </section>
  );
};
