import { Injectable } from '@nestjs/common';
import { ResponseKaspiDto } from './dto/response.kaspi.dto';
import { RequestKaspiDto } from './dto/request.kaspi.dto';
import { CheckRequestKaspiDto } from './dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from './dto/pay.request.kaspi.dto';
import { WsDeviceSubscribeController } from '../posts-ws/ws.device.subscribe.controller';

@Injectable()
export class KaspiapiService {
  check(createKaspiapiDto: CheckRequestKaspiDto): ResponseKaspiDto {
    const wsDeviceSubscribeController =
      WsDeviceSubscribeController.getInstance();

    // TODO calculating device id by kaspi qr
    const socket = wsDeviceSubscribeController.getByDeviceId('customClientId');
    socket.emit('check-payment-request', {
      txn_id: createKaspiapiDto.txn_id,
    });

    // TODO socket payment promise race with timeout 5 sec may be singleton class

    return {
      comment: '',
      sum: createKaspiapiDto.sum,
      pry_txn_id: createKaspiapiDto.txn_id,
      txn_id: createKaspiapiDto.txn_id,
      result: '1',
    };
  }

  pay(createKaspiapiDto: PayRequestKaspiDto): ResponseKaspiDto {
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
