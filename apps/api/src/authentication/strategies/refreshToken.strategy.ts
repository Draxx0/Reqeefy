import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRequest } from '../../common/types/api';
import { UsersService } from '../../models/users/users.service';
import { JwtUtilsService } from '../jwt/jwt-utils.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private usersService: UsersService,
    private jwtUtilsService: JwtUtilsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshJwtStrategy.extractJWTRefreshTokenFromRequest,
        ExtractJwt.fromBodyField('REFRESH_TOKEN'),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  private static extractJWTRefreshTokenFromRequest(
    request: RequestType,
  ): string | null {
    if (
      request.cookies &&
      'REFRESH_TOKEN' in request.cookies &&
      request.cookies.REFRESH_TOKEN.length > 0
    ) {
      return request.cookies.REFRESH_TOKEN;
    }
    return null;
  }

  async validate(req: RequestType, payload: UserRequest['user']) {
    const refreshToken =
      RefreshJwtStrategy.extractJWTRefreshTokenFromRequest(req);

    if (
      !refreshToken ||
      !(await this.jwtUtilsService.checkIfRefreshTokenStillValid(refreshToken))
    ) {
      throw new HttpException('Invalid refresh token', 403);
    }

    const user = await this.usersService.findOneById(payload.id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }
}
