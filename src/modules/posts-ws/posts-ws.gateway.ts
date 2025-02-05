import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { PostsWsService } from './posts-ws.service';
import { Socket } from 'socket.io';
import { KaspiPayWsDto } from './dto/kaspi.pay.ws.dto';
import { KaspiCheckWsDto } from './dto/kaspi.check.ws.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthTypes } from '../../authorization/auth/enums/auth.types';
import { UseGuards } from '@nestjs/common';
import { AuthWsGuard } from '../../authorization/auth-ws/auth-ws.guard';
import { CashPaymentResponseWsDto } from './dto/cash-payment-response.ws.dto';
import { CashPaymentWsDto } from './dto/cash-payment.ws.dto';

@WebSocketGateway()
@ApiBearerAuth(AuthTypes.JWT)
export class PostsWsGateway implements OnGatewayConnection {
  constructor(private readonly postsWsService: PostsWsService) {}

  handleConnection(client: any, ...args: any[]): any {
    console.log('New connection!');
    console.log('Handshake: ', client.handshake);
    console.log('Args: ', args);
  }

  @SubscribeMessage('subscribe')
  @UseGuards(AuthWsGuard)
  subscribe(@ConnectedSocket() client: Socket): WsResponse<'OK'> {
    console.log(
      `subscribed user-agent: ${client.handshake.headers['user-agent']}`,
    );
    return this.postsWsService.subscribe(client.data.postId, client);
  }

  @SubscribeMessage('kaspi-check')
  @UseGuards(AuthWsGuard)
  kaspiCheck(
    @MessageBody() kaspiCheckWsDTO: KaspiCheckWsDto & { key: string },
  ): void {
    return this.postsWsService.kaspiCheck(kaspiCheckWsDTO);
  }

  @SubscribeMessage('kaspi-pay')
  @UseGuards(AuthWsGuard)
  kaspiPay(
    @MessageBody() kaspiPayWsDTO: KaspiPayWsDto & { key: string },
  ): void {
    return this.postsWsService.kaspiPay(kaspiPayWsDTO);
  }

  @SubscribeMessage('cash-payment')
  @UseGuards(AuthWsGuard)
  async cashPayment(
    @ConnectedSocket() client: Socket,
    @MessageBody() cashPaymentWsDto: CashPaymentWsDto,
  ): Promise<WsResponse<CashPaymentResponseWsDto>> {
    return {
      event: 'cash-payment',
      data: await this.postsWsService.cashPayment(
        client.data.postId,
        cashPaymentWsDto,
      ),
    };
  }

  @SubscribeMessage('ping')
  ping(): WsResponse<string> {
    console.log('[ping-pong] They said me: "ping"');
    console.log('[ping-pong] I said: "pong"');
    return { event: 'ping', data: 'pong' };
  }
}
