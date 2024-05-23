'use client';

import { notificationsServices } from '@/services';
import { formatDate, renderErrorToast } from '@/utils';
import { Notification as NotificationInterface } from '@reqeefy/types';
import {
  FolderGit2,
  HeartHandshake,
  MessageCircle,
  MessageSquare,
  ShieldQuestion,
  Split,
  User,
} from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import {
  Button,
  ButtonLink,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../client.index';
import { Alert, AlertDescription, AlertTitle } from '../server.index';

export const Notification = ({
  notification,
  refetchUser,
}: {
  notification: NotificationInterface;
  refetchUser: () => void;
}) => {
  const notificationType: (notification: NotificationInterface) => {
    text: string;
    icon: JSX.Element;
    buttonLinkLabel?: string;
  } = (
    notification: NotificationInterface
  ): { text: string; icon: JSX.Element; buttonLinkLabel?: string } => {
    switch (notification.type) {
      case 'new_ticket':
        return {
          text: 'Nouvelle discussion !',
          icon: <MessageSquare className="text-primary-700 size-5" />,
          buttonLinkLabel: 'Consulter la discussion',
        };
      case 'new_message':
        return {
          text: 'Nouveau message !',
          icon: <MessageCircle className="text-primary-700 size-5" />,
          buttonLinkLabel: 'Consulter la discussion',
        };
      case 'new_ticket_to_distribute':
        return {
          text: 'Nouvelle discussion à distribuer !',
          icon: <Split className="size-5" />,
          buttonLinkLabel: 'Distribuer',
        };
      case 'assign_project_referent':
        return {
          text: 'Vous êtes désormais référent du projet !',
          icon: <User className="size-5" />,
        };
      case 'assign_group':
        return {
          text: 'Vous avez été assigné à un groupe !',
          icon: <User className="size-5" />,
        };
      case 'assign_project':
        return {
          text: 'Vous avez été assigné à un projet !',
          icon: <FolderGit2 className="size-5" />,
        };
      case 'welcome':
        return {
          text: 'Bienvenue !',
          icon: <HeartHandshake className="size-5" />,
        };
      default:
        return {
          text: 'Notification inconnue',
          icon: <ShieldQuestion className="size-5" />,
        };
    }
  };

  return (
    <Alert
      key={notification.id}
      className={`space-x-2 relative ${notification.read ? 'border-gray-700' : 'border-primary-700'}`}
    >
      {!notification.read && (
        <div className="absolute -top-3 -right-3 bg-primary-900 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Nouveau
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <div className="text-primary-700">
          {notificationType(notification).icon}
        </div>
        <div className="space-y-2">
          <AlertTitle className="font-semibold mb-3">
            {notificationType(notification).text}{' '}
            <small className="text-gray-900">
              - {formatDate(notification.created_at)}
            </small>
          </AlertTitle>
          <AlertDescription className="text-gray-900">
            {notification.message}
          </AlertDescription>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <DeleteNotificationButton
            notification={notification}
            refetchUser={refetchUser}
          />

          {notification.read ? null : (
            <MarkNotificationAsRead
              notification={notification}
              refetchUser={refetchUser}
            />
          )}
        </div>

        {notification.link && (
          <ButtonLink href={notification.link} size="sm">
            {notificationType(notification).buttonLinkLabel}
          </ButtonLink>
        )}
      </div>
    </Alert>
  );
};

const MarkNotificationAsRead = ({
  notification,
  refetchUser,
}: {
  notification: NotificationInterface;
  refetchUser: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleMarkAsRead = (notification: NotificationInterface) => {
    startTransition(async () => {
      try {
        await notificationsServices.markOneAsRead(notification.id);
        refetchUser();
        toast.success('La notification a bien été marquée comme lue');
      } catch (error) {
        if (error instanceof Error) {
          renderErrorToast(error.message);
        }
      }
    });
  };

  return (
    <Button
      variant={'ghost'}
      size={'sm'}
      className="text-xs"
      isLoading={isPending}
      disabled={isPending}
      onClick={() => handleMarkAsRead(notification)}
    >
      Marquer comme lu
    </Button>
  );
};

const DeleteNotificationButton = ({
  notification,
  refetchUser,
}: {
  notification: NotificationInterface;
  refetchUser: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (notification: NotificationInterface) => {
    startTransition(async () => {
      try {
        await notificationsServices.deleteOne(notification.id);
        refetchUser();
        toast.success('La notification a bien été supprimée');
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
        <Button variant={'destructive'} size={'sm'} className="text-xs">
          Supprimer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer une notification</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer cette notification ? Cette
            dernière ne sera plus visible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={'outline'}
              size={'sm'}
              disabled={isPending}
              className="text-xs"
            >
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={'destructive'}
              disabled={isPending}
              isLoading={isPending}
              onClick={() => handleDelete(notification)}
            >
              Supprimer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
