import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  //   port: process.env.DATABASE_PORT || 5432,
}));
