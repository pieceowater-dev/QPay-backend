import { PaymentType } from '../entities/payment.entity';
import { KaspiResult } from '../../kaspiapi/types/KaspiResult';

export class CreatePaymentDto {
  datetime: string;

  date: string;

  sum: string;

  txn_id?: string;

  result: KaspiResult;

  comment?: string;

  device: number;

  type?: PaymentType;
}
