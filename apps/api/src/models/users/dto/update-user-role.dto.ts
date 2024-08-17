import { UserRole } from '@reqeefy/types';
import { IsIn, IsString } from 'class-validator';

export class UpdateUserRoleDto {
  @IsString()
  @IsIn(['superadmin', 'distributor', 'agent'])
  role: UserRole;
}
