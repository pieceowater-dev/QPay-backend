import { Module } from '@nestjs/common';
import { PostsWsService } from './posts-ws.service';
import { PostsWsGateway } from './posts-ws.gateway';
import { WsDeviceSubscribeController } from './ws.device.subscribe.controller';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  providers: [PostsWsGateway, PostsWsService, WsDeviceSubscribeController],
  imports: [PaymentsModule],
  exports: [WsDeviceSubscribeController],
})
export class PostsWsModule {}
