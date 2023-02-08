import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: ['https://chat-eosin-two.vercel.app', 'http://localhost:3000'],
  });
  await app.listen(4000);
}
bootstrap();
