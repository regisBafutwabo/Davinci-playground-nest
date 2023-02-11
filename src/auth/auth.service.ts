import * as argon2 from 'argon2';

import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../user/dtos/createUser.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, password: user.password };
    const findUser = await this.usersService.findUser(payload.username);
    if (findUser) {
      const samePassword = await argon2.verify(
        findUser.password,
        payload.password,
      );

      if (samePassword) {
        return {
          access_token: this.jwtService.sign({
            username: findUser.username,
            email: findUser.email,
          }),
        };
      }
    }
  }

  async signup(user: CreateUserDto) {
    try {
      const payload = user;

      const newUser = await this.usersService.createUser(payload);

      return newUser;
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
}
