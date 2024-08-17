'use client';
import { GlobalError } from '@/containers/error-state';
import { useGetAgency } from '@/hooks';
import { AgencySettingsLoader } from '../../loading-state/agency/AgencySettingsLoader';
import { AgencySettingsInformationsContent } from './AgencySettingsInformationsContent';

export const AgencySettings = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading && !agency) return <AgencySettingsLoader />;

  if (isError && !agency) {
    return <GlobalError />;
  }

  if (!agency) return null;

  return <AgencySettingsInformationsContent agency={agency} />;
};
