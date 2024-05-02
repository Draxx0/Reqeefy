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

  async setResponseCookies({
    response,
    data,
    cookieName,
  }: {
    response: any;
    data: string;
    cookieName: string;
  }) {
    response.cookie(cookieName, data, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    });
  }
}
