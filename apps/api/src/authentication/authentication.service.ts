import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { TokenObject } from 'src/common/types/api';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { UsersService } from 'src/models/users/users.service';
import { Repository } from 'typeorm';
import { AuthenticationSigninDto } from './dto/authentication-signin.dto';
import { AuthenticationSignupDto } from './dto/authentication-signup.dto';
import { JwtUtilsService } from './jwt/jwt-utils.service';

@Injectable()
export class AuthenticationService {
  constructor(
    // REPOSITORIES
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // SERVICES
    private usersService: UsersService,
    private readonly jwtUtilsService: JwtUtilsService,
  ) {}

  async signin({
    email,
    password,
  }: AuthenticationSigninDto): Promise<TokenObject> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      console.error('Wrong password provided');
      throw new HttpException('Password is invalid', HttpStatus.UNAUTHORIZED);
    }

    delete user.password;

    return await this.jwtUtilsService.generateJwtToken(user);
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
