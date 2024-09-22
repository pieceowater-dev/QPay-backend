import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseInit } from './database.init';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      console.log('Connecting to:', configService.get('typeorm'));
      return new DataSource(configService.get('typeorm'))
        .initialize()
        .then(async (source) => await databaseInit(source, configService));
    },
    inject: [ConfigService],
  },
];
