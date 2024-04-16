import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseInit } from './database.init';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) =>
      new DataSource({
        type: 'postgres',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.database'),
        logging: true,
      })
        .initialize()
        .then(async (source) => await databaseInit(source, configService)),
    inject: [ConfigService],
  },
];
