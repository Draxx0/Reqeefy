import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRequest } from 'src/common/types/api';
import { UsersService } from 'src/models/users/users.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshJwtStrategy.extractJWTRefreshTokenFromRequest,
        ExtractJwt.fromBodyField('REFRESH_TOKEN'),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
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

  async validate(payload: UserRequest['user']) {
    const user = await this.usersService.findOneById(payload.id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }
}
