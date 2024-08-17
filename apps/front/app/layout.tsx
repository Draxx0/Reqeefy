import { fontsVariables } from '@/lib';
import TanstackQueryProvider from '@/utils/TanstackQueryProvider';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reqeefy',
  description:
    "Reqeefy l'application permettant aux agences de centraliser les demandes des clients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={fontsVariables}>
        <TanstackQueryProvider>
          {children}
          <Toaster
            toastOptions={{
              classNames: {
                error: 'bg-red-500 text-white',
              },
            }}
          />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
