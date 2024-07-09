'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  UserAvatar,
} from '@/components/client.index';
import {
  Badge,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/server.index';
import { STATIC_PATHS, getTicketStatusState } from '@/constants';
import { ticketsService } from '@/services';
import { useAuthStore } from '@/stores';
import { renderErrorToast } from '@/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import { Ticket } from '@reqeefy/types';
import { useQueryClient } from '@tanstack/react-query';
import { saveAs } from 'file-saver';
import { Download, FileText, FolderOpen, ImageIcon, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  ticket: Ticket;
};

export const TicketSideContent = ({ ticket }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false);
  const status = getTicketStatusState(ticket.status);
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const router = useRouter();

  const ticketUsers = useMemo(() => {
    if (!ticket) return [];
    return [
      ...ticket.customers.map((customer) => ({
        id: customer.id,
        avatar: customer.user.avatar,
        first_name: customer.user.first_name,
        last_name: customer.user.last_name,
        role: 'Client',
      })),
      ...ticket.support_agents.map((supportAgent) => ({
        id: supportAgent.id,
        avatar: supportAgent.user.avatar,
        first_name: supportAgent.user.first_name,
        last_name: supportAgent.user.last_name,
        role: 'Agent',
      })),
    ];
  }, [ticket]);

  const handleDownload = (fileUrl: string, fileName: string) => {
    saveAs(fileUrl, fileName);
  };

  const handleArchive = async () => {
    setIsLoading(true);
    try {
      await ticketsService.archive(ticket.id);

      await queryClient.invalidateQueries({
        queryKey: ['agency', 'tickets'],
      });

      toast.success('Discussion archivée avec succès');
      setIsLoading(false);

      router.push(STATIC_PATHS.TICKETS);
    } catch (error) {
      if (error instanceof Error) {
        setIsLoading(false);
        renderErrorToast(error.message);
      }
    }
  };

  return (
    <div className="space-y-12 flex-1 sticky top-6 h-fit hidden md:block">
      {user?.role === 'superadmin' &&
        ticket.status !== 'archived' &&
        ticket.distributed && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-3">
                <span>Archiver la discussion</span>
                <Lock className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Etes vous bien sur de vouloir archiver cette discussion ?
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-center text-red-700 mb-8">
                Cette action est irreversible et empêchera tout nouvelle échange
                de message sur cette discussion.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isLoading}>
                    Annuler
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={handleArchive}
                >
                  Archiver
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

      <div className="space-y-4">
        <h2 className="font-bold text-xl">Status</h2>
        <Separator />

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-fit h-fit">
                <Badge
                  className="uppercase cursor-pointer"
                  variant={status.variant}
                >
                  {status.label}
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent align="center" side="left">
              <p>{status.tooltipLabel}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-xl">Participants</h2>

        {ticket.agency_groups.length > 0 && (
          <>
            <p className="text-xs">
              Discussion distribué aux groupe(s) suivant(s)
            </p>

            {ticket.agency_groups.length > 4 ? (
              <div className="flex items-center flex-wrap gap-2">
                {!isSeeMoreClicked ? (
                  <>
                    {ticket.agency_groups.slice(0, 4).map((group) => (
                      <Badge key={group.id} variant="outline">
                        {group.name}
                      </Badge>
                    ))}
                    <Badge
                      className="cursor-pointer"
                      onClick={() => setIsSeeMoreClicked(true)}
                    >
                      Voir plus
                    </Badge>
                  </>
                ) : (
                  <>
                    {ticket.agency_groups.map((group) => (
                      <Badge key={group.id} variant="outline">
                        {group.name}
                      </Badge>
                    ))}
                    <Badge
                      className="cursor-pointer"
                      onClick={() => setIsSeeMoreClicked(false)}
                    >
                      Voir moins
                    </Badge>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center flex-wrap gap-2">
                {ticket.agency_groups.map((group) => (
                  <Badge key={group.id} variant="outline">
                    {group.name}
                  </Badge>
                ))}
              </div>
            )}
          </>
        )}
        <Separator />

        <div className="flex items-center -space-x-4">
          {ticketUsers.map((user) => (
            <TooltipProvider key={user.id} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <UserAvatar user={user} />
                </TooltipTrigger>
                <TooltipContent align="center" side="top">
                  <p>
                    {user.first_name} {user.last_name} -{' '}
                    <span className="font-semibold">{user.role}</span>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-xl">Pièces jointes</h2>
        <Separator />

        <div className="flex flex-col gap-2">
          {ticket.upload_files.length > 0 ? (
            ticket.upload_files.map((file) => (
              <div key={file.id} className="space-y-2">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="group flex items-center justify-between cursor-pointer"
                        onClick={() =>
                          handleDownload(file.file_url, file.file_name)
                        }
                      >
                        <div className="flex items-center gap-2">
                          {file.file_name.includes('.pdf') ? (
                            <FileText className="size-4" />
                          ) : (
                            <ImageIcon className="size-4" />
                          )}
                          <span className="group-hover:text-primary-700 transition ease-in-out duration-300">
                            {file.file_name}
                          </span>
                        </div>
                        <Download className="size-4 opacity-0 transition ease-in-out duration-300 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 text-primary-700" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent align="start" side="left">
                      <p>Cliquez pour télécharger</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Separator />
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2">
              <FolderOpen className="size-4" />
              <p>Aucune pièce jointe</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
