import { ApiProperty } from '@nestjs/swagger';

export class CreatePostTokenDto {
  @ApiProperty()
  postId: number;
}
