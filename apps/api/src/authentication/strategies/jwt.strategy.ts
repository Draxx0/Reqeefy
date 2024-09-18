import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRequest } from '../../common/types/api';
import { UsersService } from '../../models/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTTokenFromRequest,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJWTTokenFromRequest(
    request: RequestType,
  ): string | null {
    if (
      request.cookies &&
      'ACCESS_TOKEN' in request.cookies &&
      request.cookies.ACCESS_TOKEN.length > 0
    ) {
      return request.cookies.ACCESS_TOKEN;
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
