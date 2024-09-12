import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostsUsersAccessDto } from './create-posts-users-access.dto';
import { IsPositive } from 'class-validator';

export class UpdatePostsUsersAccessDto extends PartialType(
  CreatePostsUsersAccessDto,
) {
  @ApiProperty()
  @IsPositive()
  id: number;
}
