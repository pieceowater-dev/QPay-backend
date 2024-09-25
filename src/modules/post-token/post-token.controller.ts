import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PostTokenService } from './post-token.service';
import { CreatePostTokenDto } from './dto/create-post-token.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthTypes } from '../../authorization/auth/enums/auth.types';
import { AuthGuard } from '../../auth.guard';
import { AuthRoleGuard } from '../../auth.role.guard';
import { UserRoles } from '../users/entities/user.entity';

@ApiTags('PostToken')
@ApiBearerAuth(AuthTypes.JWT)
@UseGuards(AuthGuard, new AuthRoleGuard(UserRoles.ADMINISTRATOR))
@Controller('post-token')
export class PostTokenController {
  constructor(private readonly postTokenService: PostTokenService) {}

  @Post()
  async regenerate(@Body() createPostTokenDto: CreatePostTokenDto) {
    return await this.postTokenService.regenerate(createPostTokenDto);
  }
}
