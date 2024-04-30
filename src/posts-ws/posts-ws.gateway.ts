import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { PostsWsService } from './posts-ws.service';
import { SubscribeDTO } from './dto/subscribe.dto';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class PostsWsGateway {
  constructor(private readonly postsWsService: PostsWsService) {}

  @SubscribeMessage('subscribe')
  subscribe(
    @MessageBody() subscribeDTO: SubscribeDTO,
    @ConnectedSocket() client: Socket,
  ): WsResponse<'OK'> {
    return this.postsWsService.subscribe(subscribeDTO, client);
  }
}
