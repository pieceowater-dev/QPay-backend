import { ApiProperty } from '@nestjs/swagger';

export class PaginatedFilter {
  @ApiProperty({ required: false, default: 10 })
  take?: number;
  @ApiProperty({ required: false, default: 0 })
  skip?: number;
}
