'use client';

import { AgencySettingsLoader } from '@/containers/loaders';
import { AgencySettingsProjectsContent } from './AgencySettingsProjectsContent';
import { useGetAgency } from '@/hooks';

export const AgencySettingsProjects = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading) return <AgencySettingsLoader />;
  return (
    agency && (
      <section className="space-y-12">
        <AgencySettingsProjectsContent agency={agency} />
      </section>
    )
  );
};
