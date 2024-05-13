'use client';

import { PageHeader } from '@/components/server.index';
import { STATIC_PATHS } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AgencySettingsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const isActiveLink = (link: string) => pathname === link;

  return (
    <section className="space-y-12">
      <PageHeader
        title={'Gérer mon agence'}
        description={
          'Gérez votre agence, les informations de cette dernière, les clients, les projets, etc.'
        }
        hasSeparator
      />

      <div className="inline-flex h-12 gap-3 items-center justify-center rounded-md bg-gray-500 z-10 p-2 text-black sticky top-4">
        <Link
          href={STATIC_PATHS.SETTINGS}
          className={`flex-1 cursor-pointer py-1 px-3 ${isActiveLink(STATIC_PATHS.SETTINGS) ? 'bg-white rounded-md shadow-md' : ''}`}
        >
          <span className=" font-bold">Agence</span>
        </Link>
        <Link
          href={STATIC_PATHS.ACCOUNTS_SETTINGS}
          className={`flex-1 cursor-pointer py-1 px-3 ${isActiveLink(STATIC_PATHS.ACCOUNTS_SETTINGS) ? 'bg-white rounded-md shadow-md' : ''}`}
        >
          <span className=" font-bold">Comptes</span>
        </Link>
        <Link
          href={STATIC_PATHS.PROJECTS_SETTINGS}
          className={`flex-1 cursor-pointer py-1 px-3 ${isActiveLink(STATIC_PATHS.PROJECTS_SETTINGS) ? 'bg-white rounded-md shadow-md' : ''}`}
        >
          <span className=" font-bold">Projets</span>
        </Link>
      </div>
      {children}
    </section>
  );
};

export default AgencySettingsLayout;
