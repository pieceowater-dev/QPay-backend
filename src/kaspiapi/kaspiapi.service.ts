import { Injectable } from '@nestjs/common';
import { ResponseKaspiDto } from './dto/response.kaspi.dto';
import { CheckRequestKaspiDto } from './dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from './dto/pay.request.kaspi.dto';
import { WsDeviceSubscribeController } from '../posts-ws/ws.device.subscribe.controller';
import { PaymentsService } from '../payments/payments.service';
import { PaymentsEntity } from '../payments/entities/payment.entity';

@Injectable()
export class KaspiapiService {
  constructor(
    private readonly wsDeviceSubscribeController: WsDeviceSubscribeController,
    private readonly paymentsService: PaymentsService,
  ) {}

  async check(
    createKaspiapiDto: CheckRequestKaspiDto,
  ): Promise<ResponseKaspiDto> {
    const result = await this.wsDeviceSubscribeController
      .checkDevice(
        'customClientId',
        createKaspiapiDto.txn_id,
        createKaspiapiDto,
      )
      .then(() => '1')
      .catch(() => '0');

    return {
      comment: createKaspiapiDto.comment,
      sum: createKaspiapiDto.sum + '',
      pry_txn_id: createKaspiapiDto.txn_id,
      txn_id: createKaspiapiDto.txn_id,
      result: result,
    };
  }

  async pay(createKaspiapiDto: PayRequestKaspiDto): Promise<ResponseKaspiDto> {
    const result = await this.wsDeviceSubscribeController
      .payDevice('customClientId', createKaspiapiDto.txn_id, createKaspiapiDto)
      .then(() => '1')
      .catch(() => '0');

    // TODO calculate
    const device = 1;

    const savedPayment: PaymentsEntity = await this.paymentsService.create({
      sum: createKaspiapiDto.sum + '',
      comment: createKaspiapiDto.comment,
      date: createKaspiapiDto.txn_date + '',
      txn_id: createKaspiapiDto.txn_id,
      result,
      device,
    });

    return {
      ...savedPayment,
      pry_txn_id: createKaspiapiDto.txn_id,
    };
  }
}
