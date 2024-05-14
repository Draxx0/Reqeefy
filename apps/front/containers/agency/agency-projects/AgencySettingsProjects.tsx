'use client';

import { AgencySettingsLoader } from '@/containers/loading-state';
import { AgencySettingsProjectsContent } from './AgencySettingsProjectsContent';
import { useGetAgency } from '@/hooks';

export const AgencySettingsProjects = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading) return <AgencySettingsLoader />;

  if (isError || !agency) {
    return <div>Error...</div>;
  }
  return (
    <section className="space-y-12">
      <AgencySettingsProjectsContent agency={agency} />
    </section>
  );
};
