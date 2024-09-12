import { PaymentType } from '../entities/payment.entity';

export class ReportPieTypeResponseDto {
  type: PaymentType;
  count: number;
  sum: number;
}
