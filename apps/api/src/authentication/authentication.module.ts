import { Module } from '@nestjs/common';
import { UsersModule } from 'src/models/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { UserPreferencesModule } from 'src/models/user-preferences/user-preferences.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    PassportModule,
    UserPreferencesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
