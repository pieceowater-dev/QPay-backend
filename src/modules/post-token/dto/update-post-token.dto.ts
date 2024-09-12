import { PartialType } from '@nestjs/swagger';
import { CreatePostTokenDto } from './create-post-token.dto';

export class UpdatePostTokenDto extends PartialType(CreatePostTokenDto) {}
