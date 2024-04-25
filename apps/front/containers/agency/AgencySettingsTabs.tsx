import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/client.index';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export const AgencySettingsTabs = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Tabs defaultValue="agency" className="space-y-12">
      <TabsList className="sticky top-4">
        <TabsTrigger value="agency">
          <Link href={'/settings'}>Agence</Link>
        </TabsTrigger>
        <TabsTrigger value="accounts">
          <Link href={'/settings/accounts'}>Comptes</Link>
        </TabsTrigger>
        <TabsTrigger value="project">
          <Link href={'/settings/projects'}>Projets</Link>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

const AgencyContent = ({ children }: PropsWithChildren<{}>) => {
  return <TabsContent value="agency">{children}</TabsContent>;
};

const AccountContent = ({ children }: PropsWithChildren<{}>) => {
  return <TabsContent value="accounts">{children}</TabsContent>;
};

const ProjectContent = ({ children }: PropsWithChildren<{}>) => {
  return <TabsContent value="project">{children}</TabsContent>;
};

AgencySettingsTabs.AgencyContent = AgencyContent;
AgencySettingsTabs.AccountContent = AccountContent;
AgencySettingsTabs.ProjectContent = ProjectContent;
