import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserRequest } from 'src/common/types/api';
import { UserPreferencesService } from 'src/models/user-preferences/user-preferences.service';
import { AuthenticationService } from './authentication.service';
import { AuthenticationSignupDto } from './dto/authentication-signup.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private readonly userPreferencesService: UserPreferencesService,
  ) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  async signin(@Req() req: UserRequest) {
    return req.user;
  }

  @Post('signup')
  async signup(@Body() authenticationSignupDto: AuthenticationSignupDto) {
    const user = await this.authenticationService.signup(
      authenticationSignupDto,
    );

    await this.userPreferencesService.create(user.id, {
      viewMode: 'grid',
    });

    return await this.authenticationService.signin({
      email: authenticationSignupDto.email,
      password: authenticationSignupDto.password,
    });
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async status(@Req() req: UserRequest) {
    return req.user;
  }
}
