import { PaginatedFilter } from './paginated.filter';
import { SortFilter } from './sort.filter';
import { ApiProperty } from '@nestjs/swagger';

export class DefaultFilter {
  @ApiProperty()
  pagination?: PaginatedFilter;

  @ApiProperty()
  sort?: SortFilter;
}
