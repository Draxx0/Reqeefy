import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@reqeefy/types';
import { TokenObject } from 'src/common/types/api';
import {
  FIFTEEN_MINUTES,
  FOURTEEN_DAYS,
} from 'src/constants/cookies.constants';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { generateExpirationDate } from 'src/utils/generateExpirationDate';

@Injectable()
export class JwtUtilsService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: {
    id: string;
    email: string;
    role: UserRole;
  }): Promise<TokenObject> {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '14d',
      }),
    };
  }

  async reauthenticateUser(user: UserEntity, response) {
    const { access_token, refresh_token } = await this.generateJwtToken(user);

    await this.setResponseCookies({
      data: access_token,
      cookieName: 'ACCESS_TOKEN',
      response,
      expires: generateExpirationDate(FIFTEEN_MINUTES),
    });

    await this.setResponseCookies({
      data: refresh_token,
      cookieName: 'REFRESH_TOKEN',
      response,
      expires: generateExpirationDate(FOURTEEN_DAYS),
    });

    await this.setResponseCookies({
      data: JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
      cookieName: 'USER_DATA',
      response,
      expires: generateExpirationDate(FOURTEEN_DAYS),
    });

    delete user.password;

    return user;
  }

  async setResponseCookies({
    response,
    data,
    cookieName,
    expires,
  }: {
    response: any;
    data: string | object;
    cookieName: string;
    expires: Date;
  }) {
    response.cookie(cookieName, data, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      ...(process.env.NODE_ENV !== 'development' && {
        domain: '.reqeefy.fr',
      }),
      ...(process.env.NODE_ENV !== 'development' && {
        path: '/',
      }),
      expires,
    });
  }
}
