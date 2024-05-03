import { Module } from '@nestjs/common';
import { KaspiapiService } from './kaspiapi.service';
import { KaspiapiController } from './kaspiapi.controller';
import { PostsWsModule } from '../posts-ws/posts-ws.module';
import { kaspiApiProviders } from './kaspiapi.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [KaspiapiController],
  providers: [KaspiapiService, ...kaspiApiProviders],
  imports: [DatabaseModule, PostsWsModule],
})
export class KaspiapiModule {}
