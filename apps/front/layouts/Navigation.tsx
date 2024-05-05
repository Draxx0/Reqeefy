'use client';import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/client.index';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Icons,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/server.index';
import { NAV_BOTTOM_LINKS, NAV_TOP_LINKS } from '@/constants';
import { useLogOut } from '@/hooks/auth/useLogOut';
import { cn } from '@/lib';
import { useAuthStore } from '@/stores';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const { handleLogOut } = useLogOut();

  const isActive = (link: string) => link === pathname;

  const linkClasses = (link: string) => {
    return cn(
      'hover:bg-gray-500 cursor-pointer p-2 inline-flex justify-center border-2 border-transparent rounded-md transition-all ease-in-out duration-300',
      isActive(link) && 'bg-gray-500 border-primary-700 text-primary-700'
    );
  };

  if (!user) return null;

  return (
    <header className="w-[5vw] h-screen fixed top-0 bg-white border-r border-gray-700">
      <div className="flex flex-col items-center justify-between p-6 h-full">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/assets/icons/reqeefy-logo.svg"
            alt="Logo de l'application"
            width={38}
            height={38}
          />
          <ul className="space-y-4 w-fit">
            {NAV_TOP_LINKS.map((link, index) =>
              link.needsPermissions &&
              !link.needsPermissions.includes(user.role) ? null : (
                <li key={index}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={link.path}
                          className={linkClasses(link.path)}
                        >
                          <link.icon />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent align="center" side="right">
                        <p>{link.tooltipLabel}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
              )
            )}
          </ul>
        </div>

        <ul className="space-y-4 w-fit">
          {NAV_BOTTOM_LINKS.map((link, index) =>
            link.needsPermissions &&
            !link.needsPermissions.includes(user.role) ? null : (
              <li key={index}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={link.path} className={linkClasses(link.path)}>
                        <link.icon />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent align="center" side="right">
                      <p>{link.tooltipLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            )
          )}

          <li>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/user-settings"
                    className={linkClasses('/user-settings')}
                  >
                    <Avatar className="h-full w-full">
                      <AvatarImage
                        src={user.avatar?.file_url}
                        alt={`Avatar de ${user.first_name} ${user.last_name}`}
                      />
                      <AvatarFallback className="uppercase">
                        {user.first_name[0] + user.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>
                <TooltipContent align="center" side="right">
                  <p>Paramètres utilisateur</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>

          <li>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger className="hover:bg-gray-500 cursor-pointer p-2 inline-flex justify-center border-2 border-transparent rounded-md transition-all ease-in-out duration-300">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Icons.logout />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Etes-vous sûr de vouloir vous déconnecter ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Vous serez redirigé vers la page de connexion et
                          devrez vous reconnecter.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogOut}>
                          Déconnexion
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TooltipTrigger>
                <TooltipContent align="center" side="right">
                  <p>Se déconnecter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </div>
    </header>
  );
};
