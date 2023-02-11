import * as dotenv from 'dotenv';
import { UserModule } from 'src/user/user.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import databaseConfig from '../config/database.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [databaseConfig, googleConfig],
      load: [databaseConfig],
    }),
    PassportModule.register({ session: true }),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '7d' },
    }),
    UserModule,
  ],
  // providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStategy],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
