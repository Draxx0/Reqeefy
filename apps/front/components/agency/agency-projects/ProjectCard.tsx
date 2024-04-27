import { Project } from '@reqeefy/types';
import { Card, CardContent, CardFooter, CardHeader } from '../../server.index';
import { TicketSlash, User } from 'lucide-react';
import Image from 'next/image';
import { ButtonLink } from '../../client.index';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card>
      <CardHeader className="p-4">
        {project.photo_url ? (
          <Image
            src={project.photo_url.path}
            width={300}
            height={200}
            alt={`Photo du projet ${project.name}`}
          />
        ) : (
          <div
            className="
         rounded-md bg-primary-500 text-black w-full min-h-24 flex items-center font-bold justify-center
        "
          >
            {project.name.substring(0, 2).toUpperCase()}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <p className="text-xl font-bold">{project.name}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <p>{project.customers.length}</p>
            </div>

            <div className="flex items-center gap-1">
              <TicketSlash className="w-4 h-4" />
              <p>{project.tickets.length}</p>
            </div>
          </div>
        </div>
        <small>{project.description}</small>
      </CardContent>
      <CardFooter className="justify-end">
        <ButtonLink href={`/settings/projects/${project.id}`}>
          Voir le projet
        </ButtonLink>
      </CardFooter>
    </Card>
  );
};
