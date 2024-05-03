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
import { KaspiPayWsDto } from './dto/kaspi.pay.ws.dto';
import { KaspiCheckWsDto } from './dto/kaspi.check.ws.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

@UseGuards(AuthGuard)
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

  @SubscribeMessage('kaspi-check')
  kaspiCheck(@MessageBody() kaspiCheckWsDTO: KaspiCheckWsDto) {
    return this.postsWsService.kaspiCheck(kaspiCheckWsDTO);
  }

  @SubscribeMessage('kaspi-pay')
  kaspiPay(@MessageBody() kaspiPayWsDTO: KaspiPayWsDto) {
    return this.postsWsService.kaspiPay(kaspiPayWsDTO);
  }
}
