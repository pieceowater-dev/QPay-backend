import { PostEntity } from '../entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreatePostDto extends PostEntity {
  @IsString()
  @ApiProperty({ required: true })
  name!: string;

  @IsString()
  @ApiProperty({ required: true })
  address!: string;

  @IsNumberString()
  @ApiProperty({ required: true })
  bin!: string;
}
