import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postProviders } from './post.provider';
import { DatabaseModule } from '../database/database.module';
import { GlobalJwtModule } from '../jwt/jwt.module';

@Module({
  imports: [DatabaseModule, GlobalJwtModule],
  controllers: [PostsController],
  providers: [...postProviders, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
