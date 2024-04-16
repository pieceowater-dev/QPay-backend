import { ApiProperty } from '@nestjs/swagger';

export class PaginatedFilter {
  @ApiProperty({ required: false })
  take?: number;
  @ApiProperty({ required: false })
  skip?: number;
}
