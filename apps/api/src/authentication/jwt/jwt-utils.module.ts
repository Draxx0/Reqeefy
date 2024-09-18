import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FIFTEEN_MINUTES } from '../../constants/cookies.constants';
import { JwtUtilsService } from './jwt-utils.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: FIFTEEN_MINUTES },
    }),
  ],
  controllers: [],
  providers: [JwtUtilsService],
  exports: [JwtUtilsService],
})
export class JwtUtilsModule {}
