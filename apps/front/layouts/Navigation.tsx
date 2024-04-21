'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/server.index';
import { HEADER_LINKS } from '@/constants';
import { cn } from '@/lib';
import { useAuthStore } from '@/stores';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();

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
      <div className="flex flex-col items-center justify-between p-6">
        <ul className="space-y-4 w-fit">
          {HEADER_LINKS.map((link, index) =>
            link.needsPermissions &&
            !link.needsPermissions.includes(user.agent?.role) ? null : (
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
        </ul>
      </div>
    </header>
  );
};
