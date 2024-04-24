import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/client.index';
import { PropsWithChildren } from 'react';

export const AgencySettingsTabs = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Tabs defaultValue="agency" className="space-y-12">
      <TabsList>
        <TabsTrigger value="agency">Agence</TabsTrigger>
        <TabsTrigger value="project">Projets</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

const AgencyContent = ({ children }: PropsWithChildren<{}>) => {
  return <TabsContent value="agency">{children}</TabsContent>;
};

const ProjectContent = ({ children }: PropsWithChildren<{}>) => {
  return <TabsContent value="project">{children}</TabsContent>;
};

AgencySettingsTabs.AgencyContent = AgencyContent;
AgencySettingsTabs.ProjectContent = ProjectContent;
