import { Module } from '@nestjs/common';
import { PostsUsersAccessService } from './posts-users-access.service';
import { PostsUsersAccessController } from './posts-users-access.controller';
import { DatabaseModule } from '../database/database.module';
import { GlobalJwtModule } from '../jwt/jwt.module';
import { postsUsersAccessProvider } from './posts-users-access.provider';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [DatabaseModule, GlobalJwtModule, UsersModule, PostsModule],
  controllers: [PostsUsersAccessController],
  providers: [PostsUsersAccessService, ...postsUsersAccessProvider],
})
export class PostsUsersAccessModule {}
