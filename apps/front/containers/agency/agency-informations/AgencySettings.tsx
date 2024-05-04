'use client';
import { useGetAgency } from '@/hooks';
import { AgencySettingsLoader } from '../../loaders/AgencySettingsLoader';
import { AgencySettingsInformationsContent } from './AgencySettingsInformationsContent';

export const AgencySettings = () => {
  const { data: agency, isLoading, isError } = useGetAgency();

  if (isLoading) return <AgencySettingsLoader />;

  return (
    agency && (
      <section className="space-y-12">
        <AgencySettingsInformationsContent agency={agency} />

        {/* <div className="space-y-6">
          <AgencySettingsTabs>
            <>
              <AgencySettingsTabs.AgencyContent>
                <AgencySettingsInformationsContent agency={agency} />
              </AgencySettingsTabs.AgencyContent>

              <AgencySettingsTabs.AccountContent>
                <AgencySettingsAccountContent agency={agency} />
              </AgencySettingsTabs.AccountContent>

              <AgencySettingsTabs.ProjectContent>
                <AgencySettingsProjectsContent agency={agency} />
              </AgencySettingsTabs.ProjectContent>
            </>
          </AgencySettingsTabs>
        </div> */}
      </section>
    )
  );
};
