'use client';
import { useGetAgency } from '@/hooks';
import { AgencySettingsLoader } from '../../loading-state/agency/AgencySettingsLoader';
import { AgencySettingsInformationsContent } from './AgencySettingsInformationsContent';

export const AgencySettings = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading || !agency) return <AgencySettingsLoader />;

  if (isError)
    return (
      <div>
        Une erreur est survenue lors de la récupération des informations de
        l&apos;agence.
      </div>
    );

  return <AgencySettingsInformationsContent agency={agency} />;
};
