import { ProjectCard } from '@/components/server.index';
import { Project } from '@reqeefy/types';

export const AgencySettingsProjectsList = ({
  projects,
}: {
  projects: Project[];
}) => {
  return projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));
};
