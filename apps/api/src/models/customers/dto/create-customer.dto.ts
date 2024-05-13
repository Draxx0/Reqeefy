import { IsNotEmpty, IsString } from 'class-validator';
import { AuthenticationSignupDto } from 'src/authentication/dto/authentication-signup.dto';

export class CreateCustomerDto extends AuthenticationSignupDto {
  @IsString()
  @IsNotEmpty()
  project_id: string;
}
