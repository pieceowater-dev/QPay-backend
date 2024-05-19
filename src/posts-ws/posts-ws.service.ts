import { Injectable } from '@nestjs/common';
import { OnPayDto } from './dto/on-pay.dto';
import { WsDeviceSubscribeController } from './ws.device.subscribe.controller';
import { DisconnectReason, Socket } from 'socket.io';
import { WsResponse } from '@nestjs/websockets';
import { SubscribeDTO } from './dto/subscribe.dto';
import { KaspiCheckWsDto } from './dto/kaspi.check.ws.dto';
import { KaspiPayWsDto } from './dto/kaspi.pay.ws.dto';
import { CashPaymentWsDto } from './dto/cashPaymentWsDto';
import { PaymentsService } from '../payments/payments.service';
import {
  PaymentsEntity,
  PaymentType,
} from '../payments/entities/payment.entity';

@Injectable()
export class PostsWsService {
  constructor(
    private readonly wsDeviceSubscribeController: WsDeviceSubscribeController,
    private readonly paymentsService: PaymentsService,
  ) {}

  onPay(onPayDto: OnPayDto) {
    return onPayDto;
  }

  subscribe(deviceId: number, client: Socket): WsResponse<'OK'> {
    this.wsDeviceSubscribeController.set(deviceId, client);
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

  async cashPayment(
    deviceId: number,
    cashPaymentWsDto: CashPaymentWsDto,
  ): Promise<PaymentsEntity> {
    return await this.paymentsService.create({
      sum: cashPaymentWsDto.sum + '',
      type: PaymentType.CASH,
      datetime: ((+new Date() / 1000) | 0) + '',
      date: new Date().toJSON().substr(0, 10),
      device: deviceId,
      result: '1',
    });
  }
}
