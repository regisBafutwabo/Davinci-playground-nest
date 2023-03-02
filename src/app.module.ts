import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import databaseConfig from './config/database.config';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    ChatModule,
    // AuthModule,
    // UserModule,
    // PassportModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('database.url'),
        ssl: true,
        entities: [UserEntity],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
