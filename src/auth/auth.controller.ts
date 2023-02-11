import { Controller, Post, Request } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Get()
  // @UseGuards(GoogleOAuthGuard)
  // async googleAuth(@Request() req) {
  //   return '';
  // }

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

  // @Get('google-redirect')
  // // @UseGuards(GoogleOAuthGuard)
  // googleAuthRedirect(@Request() req) {
  //   return this.authService.googleLogin(req);
  // }
}
