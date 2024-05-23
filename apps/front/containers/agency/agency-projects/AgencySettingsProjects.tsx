'use client';

import { GlobalError } from '@/containers/error-state';
import { AgencyProjectSettingsLoader } from '@/containers/loading-state';
import { useGetAgency } from '@/hooks';
import { AgencySettingsProjectsContent } from './AgencySettingsProjectsContent';

export const AgencySettingsProjects = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading || !agency) return <AgencyProjectSettingsLoader />;

  if (isError && !agency) {
    return <GlobalError />;
  }

  return (
    <section className="space-y-12">
      <AgencySettingsProjectsContent agency={agency} />
    </section>
  );
};
