import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserRequest } from '../.../../common/types/api';
import { FIFTEEN_MINUTES, FOURTEEN_DAYS } from '../constants/cookies.constants';
import { Public } from '../decorator/public.decorator';
import { LocalGuard } from '../guards/local.guard';
import { RefreshJwtAuthGuard } from '../guards/refresh-jwt.guard';
import { generateExpirationDate } from '../utils/generateExpirationDate';
import { AuthenticationService } from './authentication.service';
import { AuthenticationForgotPasswordDto } from './dto/authentication-forgot-password.dto';
import { AuthenticationResetPasswordDto } from './dto/authentication-reset-password.dto';
import { JwtUtilsService } from './jwt/jwt-utils.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private readonly jwtUtilsService: JwtUtilsService,
  ) {}

  @Public()
  @Post('signin')
  @UseGuards(LocalGuard)
  async signin(@Req() req: UserRequest, @Res({ passthrough: true }) response) {
    const { access_token, refresh_token } =
      await this.jwtUtilsService.generateJwtToken(req.user);

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: access_token,
      cookieName: 'ACCESS_TOKEN',
      expires: generateExpirationDate(FIFTEEN_MINUTES),
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
      expires: generateExpirationDate(FOURTEEN_DAYS),
    });

    return req.user;
  }

  @Public()
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
      expires: generateExpirationDate(FIFTEEN_MINUTES),
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
      expires: generateExpirationDate(FOURTEEN_DAYS),
    });

    return req.user;
  }

  @Get('signout')
  async signout(@Res({ passthrough: true }) response) {
    return await this.authenticationService.logout(response);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: AuthenticationForgotPasswordDto,
  ) {
    return await this.authenticationService.forgotPassword(forgotPasswordDto);
  }

  @Public()
  @Post('reset-password/:id/:token')
  resetPassord(
    @Param('id') id: string,
    @Param('token') token: string,
    @Body() resetPasswordDto: AuthenticationResetPasswordDto,
    @Res({ passthrough: true }) response,
  ) {
    return this.authenticationService.resetPassword(
      id,
      token,
      resetPasswordDto.password,
      response,
    );
  }

  @Get('status')
  async status(@Req() req: UserRequest) {
    return req.user;
  }
}
