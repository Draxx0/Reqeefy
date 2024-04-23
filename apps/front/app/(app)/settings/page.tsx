import { PageHeader } from '@/components/server.index';

export default function SettingsPage() {
  return (
    <section className="space-y-12">
      <PageHeader
        title={'Informations agence'}
        description={'Gérez les informations de votre agence.'}
      />
    </section>
  );
}
