import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserRequest } from 'src/common/types/api';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalGuard } from '../guards/local.guard';
import { AuthenticationService } from './authentication.service';
import { JwtUtilsService } from './jwt/jwt-utils.service';

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
    });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: refresh_token,
      cookieName: 'REFRESH_TOKEN',
    });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: JSON.stringify(req.user),
      cookieName: 'USER_DATA',
    });

    return req.user;
  }

  // @Post('signup')
  // async signup(
  //   @Body() authenticationSignupDto: AuthenticationSignupDto,
  //   @Res({ passthrough: true }) response,
  // ) {
  //   const user = await this.authenticationService.signup(
  //     authenticationSignupDto,
  //   );

  //   await this.userPreferencesService.create(user.id, {
  //     viewMode: 'grid',
  //   });

  //   // Should be moved on anoteher endpoint ? bcz if i create a user using this endpoint i'm going to be logged as him
  //   const { access_token, refresh_token } =
  //     await this.authenticationService.signin({
  //       email: authenticationSignupDto.email,
  //       password: authenticationSignupDto.password,
  //     });

  //   await this.jwtUtilsService.setResponseCookies({
  //     response,
  //     token: access_token,
  //     cookieName: 'ACCESS_TOKEN',
  //   });

  //   await this.jwtUtilsService.setResponseCookies({
  //     response,
  //     token: refresh_token,
  //     cookieName: 'REFRESH_TOKEN',
  //   });

  //   return user;
  // }

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
