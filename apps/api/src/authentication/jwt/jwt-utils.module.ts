import { Module } from '@nestjs/common';
import { JwtUtilsService } from './jwt-utils.service';
import { JwtModule } from '@nestjs/jwt';
import { FIFTEEN_MINUTES } from 'src/constants/cookies.constants';

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
