import { Injectable } from '@nestjs/common';
import { ResponseKaspiDto } from './dto/response.kaspi.dto';
import { CheckRequestKaspiDto } from './dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from './dto/pay.request.kaspi.dto';
import { WsDeviceSubscribeController } from '../posts-ws/ws.device.subscribe.controller';

@Injectable()
export class KaspiapiService {
  constructor(
    private readonly wsDeviceSubscribeController: WsDeviceSubscribeController,
  ) {}

  async check(
    createKaspiapiDto: CheckRequestKaspiDto,
  ): Promise<ResponseKaspiDto> {
    console.log('check', createKaspiapiDto);
    this.wsDeviceSubscribeController.log();

    const result = await this.wsDeviceSubscribeController
      .checkDevice('customClientId', createKaspiapiDto.txn_id)
      .then(() => '1')
      .catch(() => '0');

    return {
      comment: '',
      sum: createKaspiapiDto.sum,
      pry_txn_id: createKaspiapiDto.txn_id,
      txn_id: createKaspiapiDto.txn_id,
      result: result,
    };
  }

  pay(createKaspiapiDto: PayRequestKaspiDto): ResponseKaspiDto {
    console.log('pay', createKaspiapiDto);
    /* TODO */

    return {
      comment: '',
      sum: createKaspiapiDto.sum,
      pry_txn_id: createKaspiapiDto.txn_id,
      txn_id: createKaspiapiDto.txn_id,
      result: '1',
    };
  }
}
