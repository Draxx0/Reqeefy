import { TicketPageContent } from '@/containers';import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reqeefy | Discussion',
  description: 'Découvrez toutes les discussions en cours.',
};

export default async function TicketPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section className="space-y-12">
      <TicketPageContent ticketId={params.id} />
    </section>
  );
}
