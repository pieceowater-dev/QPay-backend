import { ApiProperty } from '@nestjs/swagger';

export class CreatePostsUsersAccessDto {
  @ApiProperty()
  post: number;

  @ApiProperty()
  user: number;
}
