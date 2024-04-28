import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
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

  validate(payload: any) {
    return payload;
  }
}
