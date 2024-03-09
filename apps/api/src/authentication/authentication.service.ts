import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/models/users/users.service';
import { AuthenticationSigninDto } from './dto/authentication-signin.dto';
import { AuthenticationSignupDto } from './dto/authentication-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { TokenObject } from 'src/common/types/api';

@Injectable()
export class AuthenticationService {
  constructor(
    // REPOSITORIES
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // SERVICES
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signin({
    email,
    password,
  }: AuthenticationSigninDto): Promise<TokenObject> {
    const user = await this.usersService.findOneByEmail(email);

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      console.error('Wrong password provided');
      throw new HttpException('Password is invalid', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    delete user.password;

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async signup(body: AuthenticationSignupDto): Promise<UserEntity> {
    const isEmailAlreadyUsed = await this.usersService.findOneByEmail(
      body.email,
    );

    if (isEmailAlreadyUsed) {
      throw new HttpException(
        'Email already used',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = {
      ...body,
      password: hashedPassword,
    };

    const createdUser = this.userRepository.create(newUser);
    return await this.userRepository.save(createdUser);
  }
}
