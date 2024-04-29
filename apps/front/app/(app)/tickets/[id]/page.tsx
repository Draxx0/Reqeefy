import { TicketPageContent } from '@/containers';

export default function TicketPage({ params }: { params: { id: string } }) {
  return (
    <section className="space-y-12">
      <TicketPageContent ticketId={params.id} />
    </section>
  );
}
