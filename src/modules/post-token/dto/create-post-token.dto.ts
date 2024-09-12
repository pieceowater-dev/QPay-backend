import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class CreatePostTokenDto {
  @ApiProperty()
  @IsPositive()
  postId: number;
}
