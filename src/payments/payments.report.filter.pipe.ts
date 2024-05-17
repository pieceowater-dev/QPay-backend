import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FilterPaymentsReportDto } from './dto/filter.payments.report.dto';
import { TableDateFilter } from '../utils/date.filter';

@Injectable()
export class PaymentsReportFilterPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): FilterPaymentsReportDto {
    const posts =
      value.posts === undefined
        ? undefined
        : Array.isArray(value.posts)
          ? value.posts
          : [value.posts];
    const date = new TableDateFilter(value.dateType, value.start, value.end);
    return plainToInstance(metadata.metatype, { posts, date });
  }
}
