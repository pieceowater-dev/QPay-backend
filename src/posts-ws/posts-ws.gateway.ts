import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { PostsWsService } from './posts-ws.service';
import { Socket } from 'socket.io';
import { KaspiPayWsDto } from './dto/kaspi.pay.ws.dto';
import { KaspiCheckWsDto } from './dto/kaspi.check.ws.dto';
import { CashlessPaymentWsDto } from './dto/cashless.payment.ws.dto';
import { PaymentsEntity } from '../payments/entities/payment.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthTypes } from '../auth/enums/auth.types';
import { UseGuards } from '@nestjs/common';
import { AuthWsGuard } from '../auth-ws/auth-ws.guard';

@WebSocketGateway()
@ApiBearerAuth(AuthTypes.JWT)
@UseGuards(AuthWsGuard)
export class PostsWsGateway {
  constructor(private readonly postsWsService: PostsWsService) {}

  @SubscribeMessage('subscribe')
  subscribe(@ConnectedSocket() client: Socket): WsResponse<'OK'> {
    return this.postsWsService.subscribe(client.data.postId, client);
  }

  @SubscribeMessage('kaspi-check')
  kaspiCheck(@MessageBody() kaspiCheckWsDTO: KaspiCheckWsDto): void {
    return this.postsWsService.kaspiCheck(kaspiCheckWsDTO);
  }

  @SubscribeMessage('kaspi-pay')
  kaspiPay(@MessageBody() kaspiPayWsDTO: KaspiPayWsDto): void {
    return this.postsWsService.kaspiPay(kaspiPayWsDTO);
  }

  @SubscribeMessage('cashless-payment')
  async cashlessPayment(
    @ConnectedSocket() client: Socket,
    @MessageBody() cashlessPaymentWsDto: CashlessPaymentWsDto,
  ): Promise<WsResponse<PaymentsEntity>> {
    return {
      event: 'ping',
      data: await this.postsWsService.cashlessPayment(
        client.data.postId,
        cashlessPaymentWsDto,
      ),
    };
  }

  @SubscribeMessage('ping')
  ping(): WsResponse<string> {
    return { event: 'ping', data: 'pong' };
  }
}
