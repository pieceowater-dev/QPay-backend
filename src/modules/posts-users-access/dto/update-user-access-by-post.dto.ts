import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsPositive } from 'class-validator';

export class UpdateUserAccessByPostDto {
  @IsArray()
  @IsPositive({ each: true })
  @ApiProperty()
  users: number[];
}
