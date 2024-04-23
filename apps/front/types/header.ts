import { UserRole } from '@reqeefy/types';

export interface HeaderLink {
  path: string;
  tooltipLabel: string;
  icon: React.ComponentType;
  needsPermissions?: UserRole[];
}
