import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { DefaultFilter } from './default.filter';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DefaultFilterPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): DefaultFilter {
    return plainToInstance(metadata.metatype, {
      pagination: {
        skip: value.skip,
        take: value.take,
      },
      sort: {
        by: value.by,
        field: value.field,
      },
      search: value.search,
    });
  }
}
