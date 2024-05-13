'use client';
import { useGetAgency } from '@/hooks';
import { AgencySettingsLoader } from '../../loading-state/AgencySettingsLoader';
import { AgencySettingsInformationsContent } from './AgencySettingsInformationsContent';

export const AgencySettings = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading) return <AgencySettingsLoader />;

  if (isError || !agency)
    return (
      <div>
        Une erreur est survenue lors de la récupération des informations de
        l&apos;agence.
      </div>
    );

  return (
    <section className="space-y-12">
      <AgencySettingsInformationsContent agency={agency} />
    </section>
  );
};
