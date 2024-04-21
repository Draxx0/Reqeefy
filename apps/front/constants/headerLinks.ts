import { Icons } from '@/components/server.index';
import { HeaderLink } from '@/types/header';
export const HEADER_LINKS: Array<HeaderLink> = [
  {
    path: '/',
    tooltipLabel: 'Discussions',
    icon: Icons.ticket,
  },
  {
    path: '/distributions',
    tooltipLabel: 'Distribution',
    icon: Icons.distribution,
    needsPermissions: ['distributor', 'superadmin'],
  },
  {
    path: '/settings',
    tooltipLabel: 'Paramètres',
    icon: Icons.settings,
  },
];
