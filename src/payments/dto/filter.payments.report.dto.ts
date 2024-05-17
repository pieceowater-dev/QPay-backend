import { DateFilter } from '../../utils/date.filter';
import { ApiProperty } from '@nestjs/swagger';

export class FilterPaymentsReportDto {
  @ApiProperty({ required: false })
  date?: DateFilter;

  @ApiProperty({ required: false })
  posts?: number[];
}
