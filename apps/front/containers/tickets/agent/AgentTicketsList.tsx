import { PageHeader } from '@/components/server.index';

export const AgentTicketsList = () => {
  return (
    <section className="space-y-12">
      <PageHeader
        title="Discussions"
        description="Répondez aux questions des clients et aidez-les à résoudre leurs problèmes !"
        hasSeparator
      />
    </section>
  );
};
