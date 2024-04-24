'use client';

import { useGetAgency } from '@/hooks';
import { AgencySettingsTabs } from './AgencySettingsTabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  PageHeader,
} from '@/components/server.index';
import { AgencySettingsLoader } from '../loaders/AgencySettingsLoader';
import {
  AgencySettingsInformationsForm,
  Button,
} from '@/components/client.index';

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
                <div className="space-y-12">
                  <PageHeader
                    title={agency.name}
                    description={agency.description || 'Aucune description'}
                    hasSeparator
                    size="small"
                  />

                  <div className="flex items-center gap-12">
                    <Avatar className="w-20 h-20 rounded-xl">
                      <AvatarImage
                        src={agency.agency_photo?.path}
                        alt={`Photo de l'agence ${agency.name}`}
                        className="h-48 w-48 rounded-lg"
                      />
                      <AvatarFallback className="w-full rounded-lg h-full text-2xl flex items-center justify-center">
                        {agency.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                      <h2 className="text-lg">Photo de profile</h2>
                      <div className="flex gap-4">
                        <Button>Changer la photo</Button>
                        {!agency.agency_photo && (
                          <Button variant={'destructive'}>Supprimer</Button>
                        )}
                      </div>
                      <p className=" text-xs text-gray-900">
                        Nous supportons les formats JPG, PNG d&apos;une taille
                        maximale de 10Mo.
                      </p>
                    </div>
                  </div>
                  <AgencySettingsInformationsForm agency={agency} />
                </div>
              </AgencySettingsTabs.AgencyContent>

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
