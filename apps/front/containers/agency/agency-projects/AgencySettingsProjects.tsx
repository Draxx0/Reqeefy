'use client';

import { AgencyProjectSettingsLoader } from '@/containers/loading-state';
import { useGetAgency } from '@/hooks';
import { AgencySettingsProjectsContent } from './AgencySettingsProjectsContent';

export const AgencySettingsProjects = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading || !agency) return <AgencyProjectSettingsLoader />;

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <section className="space-y-12">
      <AgencySettingsProjectsContent agency={agency} />
    </section>
  );
};
