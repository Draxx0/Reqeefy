'use client';// Watch out page this does not be client component find a way to update it

import { PageHeader } from '@/components/server.index';
import { DistributionTicketsList } from '@/containers';
import { useAuthStore } from '@/stores';

export default function DistributionPage() {
  const user = useAuthStore((state) => state.user);

  //! should be improved in the whole app
  if (!user?.agency) return null;

  return (
    <section className="space-y-12">
      <PageHeader
        title="Distributions"
        description="Gérez la distribution des tickets entre les différents groupes d'agent de votre agence."
        hasSeparator
      />

      <DistributionTicketsList agencyId={user.agency.id} />
    </section>
  );
}
