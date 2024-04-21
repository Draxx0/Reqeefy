import {
  Icons,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/server.index';
import { HEADER_LINKS } from '@/data';
import Link from 'next/link';
export const Navigation = () => {
  return (
    <header className="w-[4%] h-screen fixed top-0 bg-white border-r border-gray-700">
      <div className="flex flex-col justify-between p-6">
        <ul className="space-y-4">
          {HEADER_LINKS.map((link, index) => (
            <TooltipProvider key={index} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <li className="hover:bg-gray-500 cursor-pointer p-2 inline-flex justify-center rounded-md transition-all ease-in-out duration-300">
                    <Link href={link.path}>
                      <Icons.ticket />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-50 relative">
                  <p className="z-10 relative">{link.tooltipLabel}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ul>
      </div>
    </header>
  );
};
