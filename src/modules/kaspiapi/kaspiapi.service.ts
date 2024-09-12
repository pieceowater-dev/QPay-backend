import { Injectable } from '@nestjs/common';
import {
  ResponseKaspiCheckDto,
  ResponseKaspiPayDto,
} from './dto/response.kaspi.dto';
import { CheckRequestKaspiDto } from './dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from './dto/pay.request.kaspi.dto';
import { WsDeviceSubscribeController } from '../posts-ws/ws.device.subscribe.controller';
import { PaymentsService } from '../payments/payments.service';
import {
  PaymentsEntity,
  PaymentType,
} from '../payments/entities/payment.entity';
import { KaspiResult } from './types/KaspiResult';
import { KASPY_TARIFFS } from './const/tariffs';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class KaspiapiService {
  constructor(
    private readonly wsDeviceSubscribeController: WsDeviceSubscribeController,
    private readonly paymentsService: PaymentsService,
    private readonly postsService: PostsService,
  ) {}

  async check(
    createKaspiapiDto: CheckRequestKaspiDto,
  ): Promise<ResponseKaspiCheckDto> {
    const post = await this.postsService.findOne(+createKaspiapiDto.device_id);

    const result: KaspiResult =
      post !== null && post.bin !== null && !post.stopped && !post.deleted
        ? await this.wsDeviceSubscribeController
            .checkDevice(
              +createKaspiapiDto.device_id,
              createKaspiapiDto.txn_id,
              createKaspiapiDto,
            )
            .then(() => 0 as KaspiResult)
            .catch(() => 1 as KaspiResult)
        : 1;

    return {
      bin: post?.bin,
      tariffs: KASPY_TARIFFS,
      sum: createKaspiapiDto.sum + '',
      txn_id: createKaspiapiDto.txn_id,
      result,
    };
  }

  private async checkExistsPayment(
    createKaspiapiDto: PayRequestKaspiDto,
  ): Promise<ResponseKaspiPayDto> {
    const existsPayment: PaymentsEntity =
      await this.paymentsService.findPaymentByTXNID(createKaspiapiDto.txn_id);
    if (existsPayment) {
      return {
        bin: null,
        comment: createKaspiapiDto.comment,
        sum: createKaspiapiDto.sum + '',
        txn_id: createKaspiapiDto.txn_id,
        pry_txn_id: createKaspiapiDto.txn_id,
        result: 3,
      };
    }
    return undefined;
  }

  private getDate(date: Date): string {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 + '').padStart(2, '0') +
      '-' +
      date.getDate()
    );
  }

  async pay(
    createKaspiapiDto: PayRequestKaspiDto,
  ): Promise<ResponseKaspiPayDto> {
    const post = await this.postsService.findOne(+createKaspiapiDto.device_id);
    const existsPayment = await this.checkExistsPayment(createKaspiapiDto);
    if (existsPayment) {
      return existsPayment;
    }

    const result: KaspiResult =
      post !== null && post.bin !== null && !post.stopped && !post.deleted
        ? await this.wsDeviceSubscribeController
            .payDevice(
              +createKaspiapiDto.device_id,
              createKaspiapiDto.txn_id,
              createKaspiapiDto,
            )
            .then(() => 0 as KaspiResult)
            .catch((e) => {
              console.log(e);
              return 1 as KaspiResult;
            })
        : 1;

    const savedPayment: PaymentsEntity = await this.paymentsService.create({
      type: PaymentType.CASHLESS,
      sum: createKaspiapiDto.sum + '',
      comment: createKaspiapiDto.comment,
      datetime: createKaspiapiDto.txn_date,
      txn_id: createKaspiapiDto.txn_id,
      result,
      device: +createKaspiapiDto.device_id,
    });

    return {
      ...savedPayment,
      bin: post.bin,
      pry_txn_id: savedPayment.id + '',
    };
  }
}
