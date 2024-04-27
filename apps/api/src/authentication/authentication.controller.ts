import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserRequest } from 'src/common/types/api';
import { UserPreferencesService } from 'src/models/user-preferences/user-preferences.service';
import { AuthenticationService } from './authentication.service';
import { AuthenticationSignupDto } from './dto/authentication-signup.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalGuard } from '../guards/local.guard';
import { RefreshJwtAuthGuard } from 'src/guards/refresh-jwt.guard';
import { JwtUtilsService } from './jwt/jwt-utils.service';
import { UsersService } from 'src/models/users/users.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private userPreferencesService: UserPreferencesService,
    private usersService: UsersService,
    private jwtUtilsService: JwtUtilsService,
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

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: UserRequest) {
    const user = await this.usersService.findOneById(req.user.id);
    return await this.jwtUtilsService.refreshJwtToken(user);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async status(@Req() req: UserRequest) {
    return req.user;
  }
}
