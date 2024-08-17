import { DistributionPageContent } from '@/containers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reqeefy | Distributions',
  description:
    "Gérez la distribution des discussions entre les différents groupes d'agent de votre agence.",
};

export default function DistributionPage() {
  return <DistributionPageContent />;
}
