import { ApiProperty } from '@nestjs/swagger';

export class SortFilter {
  @ApiProperty({ required: false, default: 'id' })
  field?: string;

  @ApiProperty({ required: false, default: 'DESC' })
  by?: 'ASC' | 'DESC';
}
