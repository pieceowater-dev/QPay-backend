import { Injectable } from '@nestjs/common';
import { OnPayDto } from './dto/on-pay.dto';
import { WsDeviceSubscribeController } from './ws.device.subscribe.controller';
import { DisconnectReason, Socket } from 'socket.io';
import { WsResponse } from '@nestjs/websockets';
import { SubscribeDTO } from './dto/subscribe.dto';
import { KaspiCheckWsDto } from './dto/kaspi.check.ws.dto';
import { KaspiPayWsDto } from './dto/kaspi.pay.ws.dto';

@Injectable()
export class PostsWsService {
  constructor(
    private readonly wsDeviceSubscribeController: WsDeviceSubscribeController,
  ) {}

  onPay(onPayDto: OnPayDto) {
    return onPayDto;
  }

  subscribe(subscribeDTO: SubscribeDTO, client: Socket): WsResponse<'OK'> {
    this.wsDeviceSubscribeController.set(subscribeDTO.deviceId, client);
    client.on('disconnect', (reason: DisconnectReason, description: any) => {
      this.wsDeviceSubscribeController.deleteBySocketId(client.id);
      console.log('Socket disconnected via reason: ', reason, description);
    });
    return { event: 'subscribe', data: 'OK' };
  }

  kaspiCheck(kaspiCheckWsDto: KaspiCheckWsDto) {
    this.wsDeviceSubscribeController.deviceActionMap
      .get(kaspiCheckWsDto.txn_id)
      ?.resolver(kaspiCheckWsDto.txn_id);
  }

  kaspiPay(kaspiPayWsDto: KaspiPayWsDto) {}
}
