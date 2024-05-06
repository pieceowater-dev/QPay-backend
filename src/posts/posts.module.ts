import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postProviders } from './post.provider';
import { DatabaseModule } from '../database/database.module';
import { GlobalJwtModule } from '../jwt/jwt.module';
import { PostsUsersAccessModule } from '../posts-users-access/posts-users-access.module';

@Module({
  imports: [DatabaseModule, GlobalJwtModule, PostsUsersAccessModule],
  controllers: [PostsController],
  providers: [...postProviders, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
