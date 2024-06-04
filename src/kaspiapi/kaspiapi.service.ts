import { Injectable } from '@nestjs/common';
import { ResponseKaspiDto } from './dto/response.kaspi.dto';
import { CheckRequestKaspiDto } from './dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from './dto/pay.request.kaspi.dto';
import { WsDeviceSubscribeController } from '../posts-ws/ws.device.subscribe.controller';
import { PaymentsService } from '../payments/payments.service';
import { PaymentsEntity } from '../payments/entities/payment.entity';
import { KaspiResult } from './types/KaspiResult';

@Injectable()
export class KaspiapiService {
  constructor(
    private readonly wsDeviceSubscribeController: WsDeviceSubscribeController,
    private readonly paymentsService: PaymentsService,
  ) {}

  async check(
    createKaspiapiDto: CheckRequestKaspiDto,
  ): Promise<ResponseKaspiDto> {
    const result: KaspiResult = await this.wsDeviceSubscribeController
      .checkDevice(
        +createKaspiapiDto.device_id,
        createKaspiapiDto.txn_id,
        createKaspiapiDto,
      )
      .then(() => 0 as KaspiResult)
      .catch(() => 1 as KaspiResult);

    return {
      comment: createKaspiapiDto.comment,
      sum: createKaspiapiDto.sum + '',
      pry_txn_id: createKaspiapiDto.txn_id,
      txn_id: createKaspiapiDto.txn_id,
      result,
    };
  }

  async pay(createKaspiapiDto: PayRequestKaspiDto): Promise<ResponseKaspiDto> {
    const result: KaspiResult = await this.wsDeviceSubscribeController
      .payDevice(
        +createKaspiapiDto.device_id,
        createKaspiapiDto.txn_id,
        createKaspiapiDto,
      )
      .then(() => 0 as KaspiResult)
      .catch(() => 1 as KaspiResult);

    const getDate = (date: Date) => {
      return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 + '').padStart(2, '0') +
        '-' +
        date.getDate()
      );
    };

    const savedPayment: PaymentsEntity = await this.paymentsService.create({
      sum: createKaspiapiDto.sum + '',
      comment: createKaspiapiDto.comment,
      datetime: createKaspiapiDto.txn_date + '',
      date: getDate(new Date(createKaspiapiDto.txn_date * 1000)),
      txn_id: createKaspiapiDto.txn_id,
      result,
      device: +createKaspiapiDto.device_id,
    });

    return {
      ...savedPayment,
      pry_txn_id: createKaspiapiDto.txn_id,
    };
  }
}
