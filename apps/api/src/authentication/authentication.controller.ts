import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationLoginDto } from './dto/authentication-login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signin')
  async signin(@Body() authenticationLoginDto: AuthenticationLoginDto) {
    return await this.authenticationService.signin(authenticationLoginDto);
  }
}
