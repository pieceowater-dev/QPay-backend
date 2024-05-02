import { Module } from '@nestjs/common';
import { PostsWsService } from './posts-ws.service';
import { PostsWsGateway } from './posts-ws.gateway';
import { WsDeviceSubscribeController } from './ws.device.subscribe.controller';

@Module({
  providers: [PostsWsGateway, PostsWsService, WsDeviceSubscribeController],
  exports: [WsDeviceSubscribeController],
})
export class PostsWsModule {}
