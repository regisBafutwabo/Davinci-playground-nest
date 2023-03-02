import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const whiteList = [
  'http://localhost:3000',
  'https://chat-eosin-two.vercel.app',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    methods: ['GET', 'POST'],
    origin: true,
  });
  await app.listen(process.env.NODE_ENV === 'production' ? 443 : 4000);
}
bootstrap();
