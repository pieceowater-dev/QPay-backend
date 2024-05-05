import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostsUsersAccessDto } from './create-posts-users-access.dto';

export class UpdatePostsUsersAccessDto extends PartialType(
  CreatePostsUsersAccessDto,
) {
  @ApiProperty()
  id: number;
}
