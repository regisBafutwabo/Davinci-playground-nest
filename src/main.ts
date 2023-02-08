import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const whiteList = process.env.WHITE_LIST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    methods: ['GET', 'POST'],
    origin: [/^(https:\/\/([^\.]*\.)?vercel\.app)$/i, 'http://localhost:3000'],
    // (origin, callback) => {
    //   if (!origin || whiteList.indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
  });
  await app.listen(4000);
}
bootstrap();
