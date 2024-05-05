import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsUsersAccessService } from './posts-users-access.service';
import { CreatePostsUsersAccessDto } from './dto/create-posts-users-access.dto';
import { UpdatePostsUsersAccessDto } from './dto/update-posts-users-access.dto';
import { PostsUsersAccess } from './entities/posts-users-access.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth.guard';
import { AuthTypes } from '../auth/enums/auth.types';

@ApiTags('PostsUsersAccess')
@UseGuards(AuthGuard)
@ApiBearerAuth(AuthTypes.JWT)
@Controller('posts-users-access')
export class PostsUsersAccessController {
  constructor(
    private readonly postsUsersAccessService: PostsUsersAccessService,
  ) {}

  @Post()
  async create(
    @Body() createPostsUsersAccessDto: CreatePostsUsersAccessDto[],
  ): Promise<PostsUsersAccess[]> {
    return await this.postsUsersAccessService.create(createPostsUsersAccessDto);
  }

  @Get('/user/:id')
  async findOneByUser(@Param('id') id: string): Promise<PostsUsersAccess[]> {
    return await this.postsUsersAccessService.findOneByUser(+id);
  }

  @Get('/post/:id')
  async findOneByPost(@Param('id') id: string): Promise<PostsUsersAccess[]> {
    return await this.postsUsersAccessService.findOneByPost(+id);
  }

  @Patch()
  async update(
    @Body() updatePostsUsersAccessDto: UpdatePostsUsersAccessDto[],
  ): Promise<PostsUsersAccess[]> {
    return await this.postsUsersAccessService.update(updatePostsUsersAccessDto);
  }

  @Delete()
  async delete(@Query() ids: number[]) {
    return await this.postsUsersAccessService.delete(ids);
  }
}
