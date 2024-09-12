import { Module } from '@nestjs/common';
import { PostTokenService } from './post-token.service';
import { PostTokenController } from './post-token.controller';
import { GlobalJwtModule } from '../../core/jwt/jwt.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [GlobalJwtModule, PostsModule],
  controllers: [PostTokenController],
  providers: [PostTokenService],
})
export class PostTokenModule {}
