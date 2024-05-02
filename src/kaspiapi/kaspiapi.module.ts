import { Module } from '@nestjs/common';
import { KaspiapiService } from './kaspiapi.service';
import { KaspiapiController } from './kaspiapi.controller';
import { PostsWsModule } from '../posts-ws/posts-ws.module';

@Module({
  controllers: [KaspiapiController],
  providers: [KaspiapiService],
  imports: [PostsWsModule],
})
export class KaspiapiModule {}
