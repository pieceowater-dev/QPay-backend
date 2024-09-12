import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class CreatePostsUsersAccessDto {
  @ApiProperty()
  @IsPositive()
  post: number;

  @ApiProperty()
  @IsPositive()
  user: number;
}
