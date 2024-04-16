import { ApiProperty } from '@nestjs/swagger';

export class SortFilter {
  @ApiProperty({ required: false })
  field?: string;

  @ApiProperty({ required: false })
  by?: 'ASC' | 'DESC';
}
