'use client';

import { MailCheck, Trash } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../client.index';
import { useTransition } from 'react';
import { renderErrorToast } from '@/utils';
import { notificationsServices } from '@/services';
import { User } from '@reqeefy/types';
import { toast } from 'sonner';

export const NotificationUtilsButton = ({
  refetchUser,
  user,
}: {
  refetchUser: () => void;
  user: User;
}) => {
  return (
    <div className="flex justify-end">
      <div className="flex gap-3">
        <MarkAllAsReadButton user={user} refetchUser={refetchUser} />
        <DeleteAllButton user={user} refetchUser={refetchUser} />
      </div>
    </div>
  );
};

const DeleteAllButton = ({
  refetchUser,
  user,
}: {
  refetchUser: () => void;
  user: User;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteAll = async () => {
    startTransition(async () => {
      try {
        await notificationsServices.deleteAll(user.id);
        refetchUser();
        toast.success('Toutes les notifications ont été supprimées');
      } catch (error) {
        if (error instanceof Error) {
          renderErrorToast(error.message);
        }
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'destructive'} size={'sm'} className="text-xs gap-2">
          <Trash className="size-4" />
          <span>Tout supprimer</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer toutes les notification</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer toutes les notifications ? Cette
            action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'} size={'sm'} className="text-xs">
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={'destructive'}
              disabled={isPending}
              isLoading={isPending}
              onClick={() => handleDeleteAll()}
            >
              Supprimer tout
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MarkAllAsReadButton = ({
  refetchUser,
  user,
}: {
  refetchUser: () => void;
  user: User;
}) => {
  const [isPending, startTransition] = useTransition();
  const isEachNotificationRead = user.notifications
    .map((n) => n.read)
    .every(Boolean);

  const handleMarkAllAsRead = async () => {
    startTransition(async () => {
      try {
        await notificationsServices.markAllAsRead(user.id);
        refetchUser();
        toast.success('Toutes les notifications ont été marquées comme lues');
      } catch (error) {
        if (error instanceof Error) {
          renderErrorToast(error.message);
        }
      }
    });
  };

  return (
    <Button
      size={'sm'}
      className={`text-xs gap-2 ${isEachNotificationRead ? 'cursor-default select-none pointer-events-none' : 'cursor-pointer'}`}
      disabled={isPending || isEachNotificationRead}
      isLoading={isPending}
      onClick={() => handleMarkAllAsRead()}
    >
      <MailCheck className="size-4" />
      <span>Tout marquer comme lu</span>
    </Button>
  );
};
