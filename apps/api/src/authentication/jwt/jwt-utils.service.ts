import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@reqeefy/types';
import { TokenObject } from 'src/common/types/api';
import { UserEntity } from 'src/models/users/entities/user.entity';

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

  async refreshJwtToken(user: UserEntity): Promise<{ access_token: string }> {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async reauthenticateUser(user: UserEntity, response) {
    const { access_token, refresh_token } = await this.generateJwtToken(user);

    await this.setResponseCookies({
      data: access_token,
      cookieName: 'ACCESS_TOKEN',
      response,
    });

    await this.setResponseCookies({
      data: refresh_token,
      cookieName: 'REFRESH_TOKEN',
      response,
    });

    await this.setResponseCookies({
      data: JSON.stringify(user),
      cookieName: 'USER_DATA',
      response,
    });

    return user;
  }

  async setResponseCookies({
    response,
    data,
    cookieName,
  }: {
    response: any;
    data: string | object;
    cookieName: string;
  }) {
    response.cookie(cookieName, data, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'https://reqeefy-front.vercel.app/auth/login',
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    });
  }
}
