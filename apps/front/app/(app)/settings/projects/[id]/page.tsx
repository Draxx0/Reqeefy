'use client';
import { Button } from '@/components/client.index';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import { useGetProject } from '@/hooks/project/useGetProject';
import { ArrowDownUp } from 'lucide-react';

//! PAGE SHOULD BE SERVER COMPONENT

export default function ProjectPage({ params }: { params: { id: string } }) {
  const {
    data: project,
    isLoading,
    isError,
  } = useGetProject({ projectId: params.id });

  //! add skeleton loader for project page
  if (isLoading || !project) {
    return <div>Loading...</div>;
  }

  //! add error visual for project page
  if (isError) {
    return (
      <div>Une erreur est survenue lors de la récupération du projet.</div>
    );
  }

  return (
    <section className="space-y-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings/projects">Projets</BreadcrumbLink>
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
                  <TooltipTrigger asChild>
                    <Avatar className="w-8 h-8 rounded-full cursor-pointer group">
                      <AvatarImage
                        src={agent.user.avatar?.file_url}
                        alt={`Photo de l'agent ${agent.user.first_name} ${agent.user.last_name}`}
                        className="h-full w-full group-hover:opacity-80 transition-opacity ease-in-out duration-300"
                      />
                      <AvatarFallback className="w-full uppercase h-full text-xs flex items-center justify-center group-hover:opacity-80 transition-opacity ease-in-out duration-300">
                        {agent.user.first_name[0] + agent.user.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
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
                  <TooltipTrigger asChild>
                    <Avatar className="w-8 h-8 rounded-full cursor-pointer group">
                      <AvatarImage
                        src={customer.user.avatar?.file_url}
                        alt={`Photo de l'agent ${customer.user.first_name} ${customer.user.last_name}`}
                        className="h-full w-full group-hover:opacity-80 transition-opacity ease-in-out duration-300"
                      />
                      <AvatarFallback className="w-full h-full text-xs flex items-center justify-center group-hover:opacity-80 transition-opacity ease-in-out duration-300">
                        {customer.user.first_name[0] +
                          customer.user.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
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

      <PageHeader title="Tickets" hasSeparator size="small" />

      <div className="flex justify-end">
        <Button
          variant={'ghost'}
          className="flex gap-2 items-center border border-gray-700"
        >
          <span>Plus récents</span>
          <ArrowDownUp className="w-4 h-4" />
        </Button>
      </div>

      <ProjectTicketsList projectId={project.id} />
    </section>
  );
}
