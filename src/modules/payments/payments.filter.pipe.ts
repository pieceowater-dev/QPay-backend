import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FilterPaymentDto } from './dto/filter.payment.dto';
import { TableDateFilter } from '../../utils/default/date.filter';

@Injectable()
export class PaymentsFilterPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): FilterPaymentDto {
    const devices = Array.isArray(value.devices)
      ? value.devices
      : typeof value.devices === 'undefined'
        ? value.devices
        : [value.devices];
    console.log(value);
    return plainToInstance(metadata.metatype, {
      pagination: {
        skip: value.skip,
        take: value.take,
      },
      sort: {
        by: value.by,
        field: value.field,
      },
      date: new TableDateFilter(value.dateType, value.start, value.end),
      devices,
      search: value.search,
    });
  }
}
