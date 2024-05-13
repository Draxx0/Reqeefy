import { GeneralTicketsList } from '@/containers';import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reqeefy | Discussions',
  description: 'Découvrez toutes les discussions en cours.',
};

export default async function TicketsPage() {
  return <GeneralTicketsList />;
}
