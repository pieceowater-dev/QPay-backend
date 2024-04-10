import { Post } from '../entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto extends Post {
  @IsString()
  @ApiProperty({ required: true })
  title!: string;

  @IsString()
  @ApiProperty({ required: true })
  content!: string;
}
