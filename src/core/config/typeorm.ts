import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.PG_HOST}`,
  port: `${process.env.PG_PORT}`,
  username: `${process.env.PG_USER}`,
  password: `${process.env.PG_PASSWORD}`,
  database: `${process.env.PG_DATABASE}`,
  entities: ['modules/**/*.entity{.ts,.js}'],
  migrations: ['core/**/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
