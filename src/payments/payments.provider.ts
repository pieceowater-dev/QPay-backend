import { DataSource } from 'typeorm';
import { PaymentsEntity } from './entities/payment.entity';

export const paymentsProvider = [
  {
    provide: 'PAYMENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PaymentsEntity),
    inject: ['DATA_SOURCE'],
  },
];
