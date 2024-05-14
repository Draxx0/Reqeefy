import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserRequest } from 'src/common/types/api';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalGuard } from '../guards/local.guard';
import { AuthenticationService } from './authentication.service';
import { JwtUtilsService } from './jwt/jwt-utils.service';
import { generateExpirationDate } from 'src/utils/generateExpirationDate';
import { FOURTEEN_DAYS, ONE_MINUTE } from 'src/constants/cookies.constants';
import { RefreshJwtAuthGuard } from 'src/guards/refresh-jwt.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private readonly jwtUtilsService: JwtUtilsService,
  ) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  async signin(@Req() req: UserRequest, @Res({ passthrough: true }) response) {
    const { access_token, refresh_token } =
      await this.jwtUtilsService.generateJwtToken(req.user);

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: access_token,
      cookieName: 'ACCESS_TOKEN',
      expires: generateExpirationDate(ONE_MINUTE),
    });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: refresh_token,
      cookieName: 'REFRESH_TOKEN',
      expires: generateExpirationDate(FOURTEEN_DAYS),
    });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: JSON.stringify({
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      }),
      cookieName: 'USER_DATA',
      expires: generateExpirationDate(ONE_MINUTE),
    });

    return req.user;
  }

  @Post('/refresh')
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) response,
  ) {
    const { access_token, refresh_token } =
      await this.jwtUtilsService.generateJwtToken(req.user);

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: access_token,
      cookieName: 'ACCESS_TOKEN',
      expires: generateExpirationDate(ONE_MINUTE),
    });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: refresh_token,
      cookieName: 'REFRESH_TOKEN',
      expires: generateExpirationDate(FOURTEEN_DAYS),
    });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: JSON.stringify({
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      }),
      cookieName: 'USER_DATA',
      expires: generateExpirationDate(ONE_MINUTE),
    });

    return req.user;
  }

  @Get('signout')
  async signout(@Res({ passthrough: true }) response) {
    return await this.authenticationService.logout(response);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async status(@Req() req: UserRequest) {
    return req.user;
  }
}
