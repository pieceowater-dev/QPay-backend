import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsPositive } from 'class-validator';

export class UpdatePostAccessByUserDto {
  @IsArray()
  @IsPositive({ each: true })
  @ApiProperty()
  posts: number[];
}
