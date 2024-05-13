import { AgencySettings } from '@/containers';import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reqeefy | Paramètres de l'agence",
  description: 'Modifier les paramètres de votre agence.',
};

export default async function SettingsPage() {
  return <AgencySettings />;
}
