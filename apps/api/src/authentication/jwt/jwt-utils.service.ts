import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenObject } from 'src/common/types/api';
import { UserEntity } from 'src/models/users/entities/user.entity';

@Injectable()
export class JwtUtilsService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: UserEntity): Promise<TokenObject> {
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
      user,
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
}
