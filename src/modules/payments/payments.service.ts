import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsEntity } from './entities/payment.entity';
import { Any, Between, ILike, Repository } from 'typeorm';
import { PaginatedList } from '../../utils/pagination/paginated.list';
import getPaginated from '../../utils/pagination/paginated.list.parse';
import { FilterPaymentDto } from './dto/filter.payment.dto';
import { FilterPieTypeDto } from './dto/filter.pie.type.dto';
import { FilterDayDebitDto } from './dto/filter.day.debit.dto';
import { ReportPieTypeResponseDto } from './dto/report.pie.type.response.dto';
import { ReportPiePostsResponseDto } from './dto/report.pie.posts.response.dto';
import { ReportDayDebitResponseDto } from './dto/report.day.debit.response.dto';
import { FilterPiePostsDto } from './dto/filter.pie.posts.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('PAYMENTS_REPOSITORY')
    private paymentsEntityRepository: Repository<PaymentsEntity>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentsEntity> {
    return await this.paymentsEntityRepository.save(createPaymentDto);
  }

  async findPaginatedMany(
    filter: FilterPaymentDto,
  ): Promise<PaginatedList<PaymentsEntity>> {
    return await this.paymentsEntityRepository
      .findAndCount({
        where: {
          comment: ILike(`%${filter.search ?? ''}%`),
          device: {
            id: filter.devices !== undefined ? Any(filter.devices) : undefined,
          },
          datetime:
            filter.date.start !== undefined && filter.date.end !== undefined
              ? Between(filter.date.start + '', filter.date.end + '')
              : undefined,
        },
        take: filter?.pagination?.take ?? 25,
        skip: filter?.pagination?.skip ?? 0,
        order: {
          [filter?.sort?.field ?? 'id']: filter?.sort?.by ?? 'DESC',
        },
      })
      .then(getPaginated);
  }

  async findOne(id: number): Promise<PaymentsEntity> {
    return await this.paymentsEntityRepository.findOneBy({ id });
  }

  async findPaymentByTXNID(txn_id: string): Promise<PaymentsEntity> {
    return await this.paymentsEntityRepository.findOneBy({ txn_id });
  }

  async getTypePie(
    filter: FilterPieTypeDto,
  ): Promise<ReportPieTypeResponseDto[]> {
    return await this.paymentsEntityRepository
      .createQueryBuilder()
      .select('type', 'type')
      .addSelect('COUNT(1)', 'count')
      .addSelect('SUM(sum::numeric::float8)', 'sum')
      .where('true')
      .andWhere(
        () =>
          filter.posts !== undefined ? `"deviceId" = ANY(:posts)` : `true`,
        { posts: filter.posts },
      )
      .andWhere(
        () =>
          filter.date.start !== undefined && filter.date.end !== undefined
            ? `createdAt BETWEEN :start AND :end`
            : `true`,
        { ...filter.date },
      )
      .groupBy('type')
      .getRawMany<ReportPieTypeResponseDto>();
  }

  async getPostsPie(
    filter: FilterPiePostsDto,
  ): Promise<ReportPiePostsResponseDto[]> {
    return await this.paymentsEntityRepository
      .createQueryBuilder('post')
      .select('device.id', 'id')
      .addSelect('device.name', 'name')
      .addSelect('COUNT(1)', 'count')
      .addSelect('SUM(sum::numeric::float8)', 'sum')
      .leftJoin('post.device', 'device')
      .where('true')
      .andWhere(
        () =>
          filter.posts !== undefined ? `"deviceId" = ANY(:posts)` : `true`,
        { posts: filter.posts },
      )
      .andWhere(
        () =>
          filter.date.start !== undefined && filter.date.end !== undefined
            ? `createdAt BETWEEN :start AND :end`
            : `true`,
        { ...filter.date },
      )
      .groupBy('device.id')
      .addGroupBy('device.name')
      .getRawMany<ReportPiePostsResponseDto>();
  }

  async getPayDebit(
    filter: FilterDayDebitDto,
  ): Promise<ReportDayDebitResponseDto> {
    return await this.paymentsEntityRepository
      .createQueryBuilder('post')
      .select(
        'to_char(to_timestamp("createdAt"), \'YYYY-MM-DD\') AS payment_date',
        'date',
      )
      .addSelect('COUNT(1)', 'count')
      .addSelect('SUM(sum::numeric::float8)', 'sum')
      .where('true')
      .andWhere(
        () =>
          filter.posts !== undefined ? `"deviceId" = ANY(:posts)` : `true`,
        { posts: filter.posts },
      )
      .andWhere(
        () =>
          filter.date.start !== undefined && filter.date.end !== undefined
            ? `createdAt BETWEEN :start AND :end`
            : `true`,
        { ...filter.date },
      )
      .groupBy('date')
      .getRawMany<ReportDayDebitResponseDto>();
  }
}
