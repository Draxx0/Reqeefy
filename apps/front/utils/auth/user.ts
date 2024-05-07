import { UserRole } from '@reqeefy/types';

export const hasDistributorPermissions = (userRole: UserRole) => {
  return userRole === 'distributor' || userRole === 'superadmin';
};

export const hasSuperAdminPermissions = (userRole: UserRole) => {
  return userRole === 'superadmin';
};
