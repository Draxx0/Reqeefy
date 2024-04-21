import './globals.css';
import type { Metadata } from 'next';
import { fontsVariables } from '@/lib';
import { Navigation } from '@/layouts';

export const metadata: Metadata = {
  title: 'Reqeefy',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={fontsVariables}>
        <Navigation />

        <main>{children}</main>
      </body>
    </html>
  );
}