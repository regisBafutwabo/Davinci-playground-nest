import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const whiteList = process.env.WHITE_LIST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  //   {
  //   allowedHeaders: ['content-type'],
  //   methods: ['GET', 'POST'],
  //   origin: (origin, callback) => {
  //     if (!origin || whiteList.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  // }
  // );
  await app.listen(process.env.NODE_ENV === 'production' ? 443 : 4000);
}
bootstrap();
