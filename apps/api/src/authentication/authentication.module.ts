import { Module } from '@nestjs/common';
import { UsersModule } from 'src/models/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserPreferencesModule } from 'src/models/user-preferences/user-preferences.module';
import { JwtUtilsModule } from './jwt/jwt-utils.module';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { NotificationsModule } from 'src/models/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    PassportModule,
    UserPreferencesModule,
    JwtUtilsModule,
    NotificationsModule,
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
