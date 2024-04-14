import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PostsWsService } from './posts-ws.service';
import { OnPayDto } from './dto/on-pay.dto';

@WebSocketGateway()
export class PostsWsGateway {
  constructor(private readonly postsWsService: PostsWsService) {}

  @SubscribeMessage('on-pay')
  onPay(@MessageBody() onPayDto: OnPayDto) {
    return this.postsWsService.onPay(onPayDto);
  }
}
