import { IConfig } from './interface/config.interface';
import * as process from 'process';

export const config = (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  secret: process.env.SECRET_KEY,
  root: {
    name: process.env.ROOT_USER,
    email: process.env.ROOT_EMAIL,
    password: process.env.ROOT_PASSWORD,
  },
});
