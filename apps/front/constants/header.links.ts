import { Icons } from '@/components/server.index';
import { HeaderLink } from '@/types/header';

export const NAV_TOP_LINKS: Array<HeaderLink> = [
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
];

export const NAV_BOTTOM_LINKS: Array<HeaderLink> = [
  {
    path: '/settings',
    tooltipLabel: 'Paramètres',
    icon: Icons.settings,
    needsPermissions: ['agent', 'distributor', 'superadmin'],
  },
  // {
  //   path: '/user-settings',
  //   tooltipLabel: 'Paramètres utilisateur',
  // },
  // {
  //   path: '/logout',
  //   tooltipLabel: 'Déconnexion',
  //   icon: Icons.logout,
  // },
];
