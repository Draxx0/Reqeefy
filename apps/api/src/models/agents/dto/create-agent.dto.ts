import { AgentRole } from '@reqeefy/types';
import { IsIn, IsNotEmpty } from 'class-validator';
import { AuthenticationSignupDto } from 'src/authentication/dto/authentication-signup.dto';

export class CreateAgentDTO extends AuthenticationSignupDto {
  @IsNotEmpty()
  @IsIn(['superadmin', 'distributor', 'agent'])
  role: AgentRole;
}

export class AddAgentToAgencyDTO {
  @IsNotEmpty()
  @IsIn(['superadmin', 'distributor', 'agent'])
  role: AgentRole;

  @IsNotEmpty()
  agencyId: string;
}
