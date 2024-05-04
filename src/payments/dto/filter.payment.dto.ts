import { DefaultFilter } from '../../utils/default.filter';
import { ApiProperty } from '@nestjs/swagger';

export class FilterPaymentDto extends DefaultFilter {
  @ApiProperty({ required: false })
  devices: number[];
}
