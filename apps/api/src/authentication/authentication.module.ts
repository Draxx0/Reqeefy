import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { NotificationsModule } from 'src/models/notifications/notifications.module';
import { UserPreferencesModule } from 'src/models/user-preferences/user-preferences.module';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { UsersModule } from 'src/models/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtUtilsModule } from './jwt/jwt-utils.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    PassportModule,
    UserPreferencesModule,
    JwtUtilsModule,
    NotificationsModule,
    MailModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
