import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationService } from './authentication.service';
import { AuthenticationSignupDto } from './dto/authentication-signup.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  async signin(@Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  async signup(@Body() authenticationSignupDto: AuthenticationSignupDto) {
    await this.authenticationService.signup(authenticationSignupDto);

    return await this.authenticationService.signin({
      email: authenticationSignupDto.email,
      password: authenticationSignupDto.password,
    });
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async status(@Req() req: Request) {
    return req.user;
  }
}
