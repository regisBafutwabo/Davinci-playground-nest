import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const whiteList = process.env.WHITE_LIST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
