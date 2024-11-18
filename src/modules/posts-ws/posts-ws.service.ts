import { Injectable } from '@nestjs/common';
import { WsDeviceSubscribeController } from './ws.device.subscribe.controller';
import { DisconnectReason, Socket } from 'socket.io';
import { WsResponse } from '@nestjs/websockets';
import { KaspiCheckWsDto } from './dto/kaspi.check.ws.dto';
import { KaspiPayWsDto } from './dto/kaspi.pay.ws.dto';
import { PaymentsService } from '../payments/payments.service';
import { PaymentType } from '../payments/entities/payment.entity';
import { CashPaymentResponseWsDto } from './dto/cash-payment-response.ws.dto';
import { CashSummator } from '../payments/cash-summator';
import { CashPaymentWsDto } from './dto/cash-payment.ws.dto';

@Injectable()
export class PostsWsService {
  constructor(
    private readonly wsDeviceSubscribeController: WsDeviceSubscribeController,
    private readonly paymentsService: PaymentsService,
  ) {}

  subscribe(deviceId: number, client: Socket): WsResponse<'OK'> {
    this.wsDeviceSubscribeController.set(deviceId, client);
    client.on('disconnect', (reason: DisconnectReason, description: any) => {
      this.wsDeviceSubscribeController.deleteBySocketId(client.id);
      console.log('Socket disconnected via reason: ', reason, description);
    });
    return { event: 'subscribe', data: 'OK' };
  }

  kaspiCheck(kaspiCheckWsDto: KaspiCheckWsDto & { key: string }) {
    this.wsDeviceSubscribeController.deviceActionMap
      .get(kaspiCheckWsDto.key)
      ?.resolver(kaspiCheckWsDto.key);
  }

  kaspiPay(kaspiPayWsDto: KaspiPayWsDto & { key: string }) {
    this.wsDeviceSubscribeController.deviceActionMap
      .get(kaspiPayWsDto.key)
      ?.resolver(kaspiPayWsDto.key);
  }

  async cashPayment(
    deviceId: number,
    cashPaymentWsDto: CashPaymentWsDto,
  ): Promise<CashPaymentResponseWsDto> {
    CashSummator.getInstance().sum(
      deviceId,
      +cashPaymentWsDto.sum,
      async (sum: number) => {
        await this.paymentsService.create({
          sum: sum + '',
          type: PaymentType.CASH,
          device: deviceId,
          result: 0,
        });
      },
    );
    return { status: 'OK' };
  }
}
