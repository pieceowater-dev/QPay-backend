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
import { AuthTypes } from '../auth/enums/auth.types';
import { AuthGuard } from '../auth.guard';
import { DefaultFilter } from '../utils/default.filter';
import { DefaultFilterPipe } from '../utils/default.filter.pipe';

@ApiTags('Posts')
@UseGuards(AuthGuard)
@ApiBearerAuth(AuthTypes.JWT)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.postsService.create(createPostDto, req.user);
  }

  @Get()
  findAll(@Query(DefaultFilterPipe) filter: DefaultFilter, @Req() req: any) {
    return this.postsService.findAll(req.user, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: any,
  ) {
    return this.postsService.update(+id, updatePostDto, req.user);
  }
}
