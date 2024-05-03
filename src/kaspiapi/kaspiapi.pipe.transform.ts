import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CheckRequestKaspiDto } from './dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from './dto/pay.request.kaspi.dto';

@Injectable()
export class KaspiapiPipeTransform implements PipeTransform {
  parseDate(dateString: string): number {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hours = dateString.substring(8, 10);
    const minutes = dateString.substring(10, 12);
    const seconds = dateString.substring(12, 14);
    return +new Date(
      +year ?? 0,
      +month - 1 ?? 0,
      +day ?? 0,
      +hours ?? 0,
      +minutes ?? 0,
      +seconds ?? 0,
    );
  }

  transform(
    value: any,
    metadata: ArgumentMetadata,
  ): CheckRequestKaspiDto | PayRequestKaspiDto {
    return plainToInstance(metadata.metatype, {
      ...value,
      txn_date:
        value.txn_date && value.txn_date.length > 0
          ? this.parseDate(value.txn_date)
          : undefined,
    });
  }
}
