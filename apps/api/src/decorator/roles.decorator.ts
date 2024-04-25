import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@reqeefy/types';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

export const AGENTS_PERMISSIONS: UserRole[] = [
  'superadmin',
  'distributor',
  'agent',
];
export const DISTRIBUTORS_PERMISSIONS: UserRole[] = [
  'superadmin',
  'distributor',
];
export const SUPERADMINS_PERMISSIONS: UserRole[] = ['superadmin'];
