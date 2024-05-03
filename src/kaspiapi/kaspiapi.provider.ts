import { DataSource } from 'typeorm';
import { PaymentsEntity } from './entities/payments.entity';

export const kaspiApiProviders = [
  {
    provide: 'KASPI_PAYMENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PaymentsEntity),
    inject: ['DATA_SOURCE'],
  },
];
