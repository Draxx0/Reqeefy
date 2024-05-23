'use client';
import { UserAvatar } from '@/components/client.index';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  PageHeader,
  ProjectTicketsList,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/server.index';
import { STATIC_PATHS } from '@/constants';
import { GlobalError } from '@/containers';
import { useGetProject } from '@/hooks/project/useGetProject';

//! PAGE SHOULD BE SERVER COMPONENT

export default function ProjectPage({ params }: { params: { id: string } }) {
  const {
    data: project,
    isLoading,
    isError,
  } = useGetProject({ projectId: params.id });

  //! add skeleton loader for project page
  if (isLoading && !project) {
    return <div>Loading...</div>;
  }

  if (isError && !project) {
    return <GlobalError />;
  }

  if (!project) return null;

  return (
    <section className="space-y-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={STATIC_PATHS.PROJECTS_SETTINGS}>
              Projets
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Projet - {project.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader
        title={project.name}
        description={project.description || 'Aucune description'}
        hasSeparator
      />
      <div className="flex justify-between">
        <div className="flex flex-col items-center gap-4">
          <p>Référent(s) du projet</p>
          <div className="flex -space-x-4 items-center">
            {project.agents_referents.map((agent) => (
              <TooltipProvider key={agent.id} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <UserAvatar user={agent.user} />
                  </TooltipTrigger>
                  <TooltipContent align="center" side="top">
                    <p>
                      {agent.user.first_name} {agent.user.last_name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p>Clients(s) du projet</p>
          <div className="grid grid-cols-4 items-center">
            {project.customers.map((customer) => (
              <TooltipProvider key={customer.id} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <UserAvatar user={customer.user} />
                  </TooltipTrigger>
                  <TooltipContent align="center" side="top">
                    <p>
                      {customer.user.first_name} {customer.user.last_name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>

      <PageHeader title="Discussions" hasSeparator size="small" />

      <ProjectTicketsList projectId={project.id} />
    </section>
  );
}
