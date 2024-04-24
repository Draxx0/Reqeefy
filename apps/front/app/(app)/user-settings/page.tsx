import { UserSettingsForm } from '@/components/client.index';
import { PageHeader, Separator } from '@/components/server.index';

export default function UserSettingsPage() {
  return (
    <section className="space-y-12">
      <PageHeader
        title={'Informations personnelles'}
        description={'Modifier vos informations personnelles ici.'}
        hasSeparator
      />

      <div className="max-w-3xl">
        <UserSettingsForm />
      </div>
    </section>
  );
}
