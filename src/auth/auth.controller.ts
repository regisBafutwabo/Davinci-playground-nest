import { Controller, Post, Request } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Request() req) {
    const user = await this.authService.signup(req.body);
    return user;
  }

  @Post('login')
  async login(@Request() req) {
    const token = await this.authService.login(req.body);
    return token;
  }
}
