import { IConfig } from './interface/config.interface';
import * as process from 'process';

export const config = (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  secret: process.env.SECRET_KEY,
  db: {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10) ?? 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
});
