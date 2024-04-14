import { Module } from '@nestjs/common';
import { PostsWsService } from './posts-ws.service';
import { PostsWsGateway } from './posts-ws.gateway';

@Module({
  providers: [PostsWsGateway, PostsWsService],
})
export class PostsWsModule {}
