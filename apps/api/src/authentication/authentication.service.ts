import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { MailService } from '..//mail/mail.service';
import { UserEntity } from '..//models/users/entities/user.entity';
import { UsersService } from '..//models/users/users.service';
import { AuthenticationForgotPasswordDto } from './dto/authentication-forgot-password.dto';
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
    private eventEmitter: EventEmitter2,
    private readonly mailService: MailService,
    private readonly jwtUtilsService: JwtUtilsService,
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

    const accountActivationToken = Math.floor(
      1000 + Math.random() * 9000,
    ).toString();

    this.eventEmitter.emit('new.user', {
      first_name: persistedUser.first_name,
      last_name: persistedUser.last_name,
      email: persistedUser.email,
      accountActivationToken,
      userId: persistedUser.id,
    });

    return persistedUser;
  }

  async forgotPassword(forgotPasswordDto: AuthenticationForgotPasswordDto) {
    const email = forgotPasswordDto.email;
    const user = await this.usersService.findOneByEmail(email);

    const length = Math.floor(15 + Math.random() * 6);
    const token = Array(length)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10))
      .join('');

    await this.userRepository.update(user.id, {
      reset_password_token: token,
      reset_password_token_expires: new Date(Date.now() + 900000),
    });

    if (
      await this.mailService.sendForgotPassword({
        user: { email: user.email, id: user.id },
        token,
      })
    ) {
      return {
        message: 'Un email de réinitialisation de mot de passe a été envoyé.',
      };
    }
    throw new HttpException(
      'An error occured while sending email',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async resetPassword(userId: string, token: string, newPassword: string, res) {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isTokenExpired = user.reset_password_token_expires < new Date();

    if (isTokenExpired) {
      throw new HttpException('Token expired', HttpStatus.FORBIDDEN, {
        description: 'Token expired',
      });
    }

    if (user.reset_password_token !== token) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
      reset_password_token: null,
      reset_password_token_expires: null,
    });

    await this.jwtUtilsService.reauthenticateUser(updatedUser, res);

    return { message: 'Password updated' };
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
