import { PaymentType } from '../entities/payment.entity';

export class CreatePaymentDto {
  datetime: string;

  date: string;

  sum: string;

  txn_id?: string;

  result: string;

  comment?: string;

  device: number;

  type?: PaymentType;
}
