'use client';

import { useGetAgency } from '@/hooks';
import { AgencySettingsTabs } from './AgencySettingsTabs';
import {
  AgencySettingsAccountContent,
  AgencySettingsInformationsContent,
} from '@/components/client.index';
import { PageHeader } from '@/components/server.index';
import { AgencySettingsLoader } from '../loaders/AgencySettingsLoader';

export const AgencySettings = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading) return <AgencySettingsLoader />;

  return (
    agency && (
      <section className="space-y-12">
        <PageHeader
          title={'Informations agence'}
          description={'Gérez les informations de votre agence.'}
          hasSeparator
        />

        <div className="space-y-6">
          <AgencySettingsTabs>
            <>
              <AgencySettingsTabs.AgencyContent>
                <AgencySettingsInformationsContent agency={agency} />
              </AgencySettingsTabs.AgencyContent>

              <AgencySettingsTabs.AccountContent>
                <AgencySettingsAccountContent agency={agency} />
              </AgencySettingsTabs.AccountContent>

              <AgencySettingsTabs.ProjectContent>
                Je suis le projet
              </AgencySettingsTabs.ProjectContent>
            </>
          </AgencySettingsTabs>
        </div>
      </section>
    )
  );
};
