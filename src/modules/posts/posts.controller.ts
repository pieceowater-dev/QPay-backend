import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthTypes } from '../../authorization/auth/enums/auth.types';
import { AuthGuard } from '../../auth.guard';
import { DefaultFilter } from '../../utils/default/default.filter';
import { DefaultFilterPipe } from '../../utils/default/default.filter.pipe';
import { AuthRoleGuard } from '../../auth.role.guard';
import { UserRoles } from '../users/entities/user.entity';

@ApiTags('Posts')
@UseGuards(AuthGuard)
@ApiBearerAuth(AuthTypes.JWT)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(new AuthRoleGuard(UserRoles.ADMINISTRATOR))
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query(DefaultFilterPipe) filter: DefaultFilter, @Req() req: any) {
    return this.postsService.findAll(req.user, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseGuards(new AuthRoleGuard(UserRoles.ADMINISTRATOR))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }
}
