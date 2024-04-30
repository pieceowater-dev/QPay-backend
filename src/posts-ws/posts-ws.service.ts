import { Injectable } from '@nestjs/common';
import { OnPayDto } from './dto/on-pay.dto';
import { WsDeviceSubscribeController } from './ws.device.subscribe.controller';
import { DisconnectReason, Socket } from 'socket.io';
import { WsResponse } from '@nestjs/websockets';
import { SubscribeDTO } from './dto/subscribe.dto';

@Injectable()
export class PostsWsService {
  onPay(onPayDto: OnPayDto) {
    return onPayDto;
  }

  subscribe(subscribeDTO: SubscribeDTO, client: Socket): WsResponse<'OK'> {
    const wsDeviceSubscribeController =
      WsDeviceSubscribeController.getInstance();
    wsDeviceSubscribeController.set(subscribeDTO.deviceId, client);
    client.on('disconnect', (reason: DisconnectReason, description: any) => {
      wsDeviceSubscribeController.deleteBySocketId(client.id);
      console.log('Socket disconnected via reason: ', reason, description);
    });
    return { event: 'subscribe', data: 'OK' };
  }
}
