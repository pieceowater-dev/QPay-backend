import { DefaultFilter } from '../../../utils/default/default.filter';
import { ApiProperty } from '@nestjs/swagger';
import { DateFilter } from '../../../utils/default/date.filter';

export class FilterPaymentDto extends DefaultFilter {
  @ApiProperty({ required: false })
  devices: number[];

  @ApiProperty({ required: false })
  date: DateFilter;
}
