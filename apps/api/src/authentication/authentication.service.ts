import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/models/users/users.service';
import { AuthenticationLoginDto } from './dto/authentication-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signin({ email, password }: AuthenticationLoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Wrong password provided');
    }
    const payload = {
      ...user,
      sub: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }
}
