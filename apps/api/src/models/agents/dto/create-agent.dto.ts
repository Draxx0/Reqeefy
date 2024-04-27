import { UserRole } from '@reqeefy/types';
import { IsIn, IsNotEmpty, IsUUID } from 'class-validator';
import { AuthenticationSignupDto } from 'src/authentication/dto/authentication-signup.dto';

export class CreateAgentDTO extends AuthenticationSignupDto {
  @IsNotEmpty()
  @IsIn(['customer', 'superadmin', 'distributor', 'agent'])
  role: UserRole;

  @IsNotEmpty()
  @IsUUID()
  agency_group_id: string;
}

export class AddAgentToAgencyDTO {
  @IsNotEmpty()
  @IsIn(['superadmin', 'distributor', 'agent'])
  role: UserRole;

  @IsNotEmpty()
  agencyId: string;
}
