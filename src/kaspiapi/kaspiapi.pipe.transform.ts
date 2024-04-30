import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CheckRequestKaspiDto } from './dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from './dto/pay.request.kaspi.dto';

@Injectable()
export class KaspiapiPipeTransform implements PipeTransform {
  transform(
    value: any,
    metadata: ArgumentMetadata,
  ): CheckRequestKaspiDto | PayRequestKaspiDto {
    return plainToInstance(metadata.metatype, value);
  }
}
