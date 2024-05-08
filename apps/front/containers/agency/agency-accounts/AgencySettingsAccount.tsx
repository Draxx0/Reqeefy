'use client';

import { useGetAgency } from '@/hooks';
import { AgencySettingsAccountContent } from '@/components/client.index';
import { AgencySettingsLoader } from '../../loading-state/AgencySettingsLoader';

export const AgencySettingsAccount = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading) return <AgencySettingsLoader />;

  return (
    agency && (
      <section className="space-y-12">
        <AgencySettingsAccountContent agency={agency} />
      </section>
    )
  );
};
