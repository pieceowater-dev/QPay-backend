import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FilterPaymentDto } from './dto/filter.payment.dto';

@Injectable()
export class PaymentsFilterPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): FilterPaymentDto {
    const devices = Array.isArray(value.devices)
      ? value.devices
      : typeof value.devices === 'undefined'
        ? value.devices
        : [value.devices];
    return plainToInstance(metadata.metatype, {
      pagination: {
        skip: value.skip,
        take: value.take,
      },
      sort: {
        by: value.by,
        field: value.field,
      },
      devices,
      search: value.search,
    });
  }
}
