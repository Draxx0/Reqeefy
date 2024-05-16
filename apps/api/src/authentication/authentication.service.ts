import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { UsersService } from 'src/models/users/users.service';
import { Repository } from 'typeorm';
import { AuthenticationSigninDto } from './dto/authentication-signin.dto';
import { AuthenticationSignupDto } from './dto/authentication-signup.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthenticationService {
  constructor(
    // REPOSITORIES
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // SERVICES
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  async signin({
    email,
    password,
  }: AuthenticationSigninDto): Promise<UserEntity> {
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

    // return await this.jwtUtilsService.generateJwtToken(user);
    return user;
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
      first_name: body.first_name[0].toUpperCase() + body.first_name.slice(1),
      last_name: body.last_name.toUpperCase(),
      password: hashedPassword,
    };

    const createdUser = this.userRepository.create(newUser);

    const persistedUser = await this.userRepository.save(createdUser);

    this.eventEmitter.emit('new.user', {
      firstName: persistedUser.first_name,
      lastName: persistedUser.last_name,
      userId: persistedUser.id,
    });

    return persistedUser;
  }

  async logout(response) {
    response.cookie('ACCESS_TOKEN', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() - 1000),
    });
    response.cookie('REFRESH_TOKEN', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() - 1000),
    });
    response.cookie('USER_DATA', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() - 1000),
    });
    return { message: 'Signout successful' };
  }
}
