import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const whiteList = process.env.WHITE_LIST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    methods: ['GET', 'POST'],
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin) !== -1) {
        // console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        // console.log('blocked cors for:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
  });
  await app.listen(process.env.NODE_ENV === 'production' ? 443 : 4000);
}
bootstrap();
