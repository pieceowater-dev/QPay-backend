import { Module } from '@nestjs/common';
import { PostsUsersAccessService } from './posts-users-access.service';
import { PostsUsersAccessController } from './posts-users-access.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { GlobalJwtModule } from '../../core/jwt/jwt.module';
import { postsUsersAccessProvider } from './posts-users-access.provider';

@Module({
  imports: [DatabaseModule, GlobalJwtModule],
  controllers: [PostsUsersAccessController],
  providers: [PostsUsersAccessService, ...postsUsersAccessProvider],
  exports: [PostsUsersAccessService],
})
export class PostsUsersAccessModule {}
