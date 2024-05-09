import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PostTokenService } from './post-token.service';
import { CreatePostTokenDto } from './dto/create-post-token.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthTypes } from '../auth/enums/auth.types';
import { AuthGuard } from '../auth.guard';

@ApiTags('PostToken')
@ApiBearerAuth(AuthTypes.JWT)
@UseGuards(AuthGuard)
@Controller('post-token')
export class PostTokenController {
  constructor(private readonly postTokenService: PostTokenService) {}

  @Post()
  async regenerate(@Body() createPostTokenDto: CreatePostTokenDto) {
    return await this.postTokenService.regenerate(createPostTokenDto);
  }
}
