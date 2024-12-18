'use client';
import {
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
import { STATIC_PATHS } from '@/constants';
import { useGetProfile, useLogOut } from '@/hooks';
import { cn } from '@/lib';
import { useAuthStore } from '@/stores';
import { hasDistributorPermissions, hasSuperAdminPermissions } from '@/utils';
import { User } from '@reqeefy/types';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Bell, MessagesSquare, Settings, Split } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Navigation = () => {
  const user = useAuthStore((state) => state.user);
  const { fetchUser } = useGetProfile();
  const pathname = usePathname();
  const { handleLogOut } = useLogOut();
  const queryClient = useQueryClient();

  const isActive = (link: string) => link === pathname;

  const linkClasses = (link: string) => {
    return cn(
      'hover:bg-gray-500 cursor-pointer p-2 inline-flex justify-center border-2 border-transparent rounded-md transition-all ease-in-out duration-300',
      isActive(link) && 'bg-gray-500 border-primary-700 text-primary-700'
    );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <>
      <header className="w-[5vw] hidden lg:block h-screen fixed top-0 bg-white border-r border-gray-700">
        <div className="flex flex-col items-center justify-between p-6 h-full">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/assets/icons/reqeefy-logo.svg"
              priority
              alt="Logo de l'application"
              width={38}
              height={38}
            />
            <ul className="space-y-4 w-fit">
              <li className="active:translate-y-1 transition ease-in-out">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={STATIC_PATHS.TICKETS}
                        className={linkClasses(STATIC_PATHS.TICKETS)}
                      >
                        <MessagesSquare />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent align="center" side="right">
                      <p>Discussions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              {hasDistributorPermissions(user.role) && (
                <li
                  className="active:translate-y-1 transition ease-in-out"
                  // onMouseEnter={async () => {
                  //   if (!user || !user.agency) return;

                  //   await queryClient.prefetchQuery({
                  //     queryKey: [
                  //       'agency',
                  //       user.agency.id,
                  //       'distribution',
                  //       'tickets',
                  //       1,
                  //       'DESC',
                  //     ],
                  //     queryFn: async () => {
                  //       return await ticketsService.getAllToDistributeByAgency(
                  //         user.agency!.id,
                  //         {
                  //           page: 1,
                  //           limit_per_page: LARGE_PAGE_SIZE,
                  //           sort_by: 'created_at',
                  //           sort_order: 'DESC',
                  //         }
                  //       );
                  //     },
                  //   });
                  // }}
                >
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={STATIC_PATHS.DISTRIBUTIONS}
                          className={linkClasses(STATIC_PATHS.DISTRIBUTIONS)}
                        >
                          <Split />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent align="center" side="right">
                        <p>Distribution</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
              )}
              <li className="active:translate-y-1 transition ease-in-out">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={STATIC_PATHS.NOTIFICATIONS}
                        className={`${linkClasses(STATIC_PATHS.NOTIFICATIONS)}`}
                      >
                        <div className="relative">
                          {user.notifications.filter((n) => !n.read).length >
                            0 && (
                            <div className="size-2.5 bg-primary-700 rounded-full flex items-center justify-center absolute -top-1 -right-1">
                              <div
                                className="
                           size-2 bg-primary-900  rounded-full animate-ping
                          "
                              ></div>
                            </div>
                          )}
                          <Bell />
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent align="center" side="right">
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ul>
          </div>

          <ul className="space-y-4 w-fit">
            {hasSuperAdminPermissions(user.role) && (
              <li
                className="active:translate-y-1 transition ease-in-out"
                // onMouseEnter={async () => {
                //   await queryClient.prefetchQuery({
                //     queryKey: ['agency'],
                //     queryFn: async () => {
                //       if (!user || !user.agency) return null;
                //       return await agencyService.get(user.agency.id);
                //     },
                //   });
                // }}
              >
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={STATIC_PATHS.SETTINGS}
                        className={linkClasses(STATIC_PATHS.SETTINGS)}
                      >
                        <Settings />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent align="center" side="right">
                      <p>Paramètres d&apos;agence</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            )}
            <li className="active:translate-y-1 transition ease-in-out">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={STATIC_PATHS.USER_SETTINGS}
                      className={linkClasses(STATIC_PATHS.USER_SETTINGS)}
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
                  <TooltipTrigger className="hover:bg-gray-500 active:translate-y-1 cursor-pointer p-2 inline-flex justify-center border-2 border-transparent rounded-md transition-all ease-in-out duration-300">
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

      <ResponsiveNavigation
        user={user}
        linkClasses={linkClasses}
        handleLogOut={handleLogOut}
      />
    </>
  );
};

const ResponsiveNavigation = ({
  user,
  linkClasses,
  handleLogOut,
}: {
  user: User;
  linkClasses: (link: string) => string;
  handleLogOut: () => Promise<void>;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="lg:hidden">
      <div
        className="fixed top-4 left-3 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0, rotate: isMenuOpen ? 360 : -360 }}
          transition={{ duration: 0.5 }}
          className={`relative w-10 h-10 rounded-full active:scale-110 shadow-md bg-gradient-to-r from-[#7489fe] to-[#dba0ff]`}
        >
          <Image
            src="/assets/icons/reqeefy-logo-mobile.svg"
            alt="Logo de l'application"
            fill
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ x: -500, opacity: 0 }}
        animate={{ x: isMenuOpen ? 0 : -500, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`fixed z-40 w-[15%] top-0 h-full bg-white border-r border-primary-700 `}
      >
        <div className="flex flex-col items-center h-full pt-20 pb-6  justify-between gap-4">
          <ul className="space-y-4 w-fit">
            <li>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href={STATIC_PATHS.TICKETS}
                className="active:translate-y-1 cursor-pointer p-2 inline-flex justify-center border-2 border-transparent rounded-md transition-all ease-in-out duration-300"
              >
                <MessagesSquare />
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href={STATIC_PATHS.DISTRIBUTIONS}
                className="active:translate-y-1 cursor-pointer p-2 inline-flex justify-center border-2 border-transparent rounded-md transition-all ease-in-out duration-300"
              >
                <Split />
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href={STATIC_PATHS.NOTIFICATIONS}
                className="active:translate-y-1 cursor-pointer p-2 inline-flex justify-center border-2 border-transparent rounded-md transition-all ease-in-out duration-300"
              >
                <Bell />
              </Link>
            </li>
          </ul>

          <ul className="flex flex-col items-center gap-4 w-fit">
            {hasSuperAdminPermissions(user.role) && (
              <li className="active:translate-y-1 transition ease-in-out">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        onClick={() => setIsMenuOpen(false)}
                        href={STATIC_PATHS.SETTINGS}
                        className={linkClasses(STATIC_PATHS.SETTINGS)}
                      >
                        <Settings />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent align="center" side="right">
                      <p>Paramètres d&apos;agence</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            )}
            <li className="active:translate-y-1 transition ease-in-out">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      href={STATIC_PATHS.USER_SETTINGS}
                      className={linkClasses(STATIC_PATHS.USER_SETTINGS)}
                    >
                      <Avatar className="size-6">
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
                  <TooltipTrigger className="hover:bg-gray-500 active:translate-y-1 cursor-pointer p-2 inline-flex justify-center border-2 border-transparent rounded-md transition-all ease-in-out duration-300">
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
      </motion.div>
    </header>
  );
};
