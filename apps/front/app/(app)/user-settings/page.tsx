import { UserSettingsForm, UserUploadAvatar } from '@/components/client.index';
import { PageHeader } from '@/components/server.index';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reqeefy | Informations personnelles',
  description: 'Modifier vos informations personnelles ici.',
};

export default async function UserSettingsPage() {
  return (
    <section className="space-y-12">
      <PageHeader
        title={'Informations personnelles'}
        description={'Modifier vos informations personnelles ici.'}
        hasSeparator
      />

      <div className="max-w-3xl space-y-12">
        <PageHeader title="Avatar" size="small" hasSeparator />
        <UserUploadAvatar />

        <PageHeader title="Compte" size="small" hasSeparator />
        <UserSettingsForm />
      </div>
    </section>
  );
}
