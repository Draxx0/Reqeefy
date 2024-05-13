import { AgencySettingsAccount } from '@/containers';import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reqeefy | Paramètres de comptes',
  description: 'Modifier les paramètres des comptes de votre agence.',
};

export default async function AgencyAccountsSettingsPage() {
  return <AgencySettingsAccount />;
}
