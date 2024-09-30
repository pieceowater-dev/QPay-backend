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
import { TokenPayload } from '../../authorization/auth/interfaces/token.payload';
import { UserRoles } from '../users/entities/user.entity';

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
    user: TokenPayload,
  ): Promise<PaginatedList<PaymentsEntity>> {
    return await this.paymentsEntityRepository
      .findAndCount({
        where: {
          comment: ILike(`%${filter.search ?? ''}%`),
          device: {
            id: filter.devices !== undefined ? Any(filter.devices) : undefined,
            posts: {
              user: {
                id: user.role === UserRoles.ADMINISTRATOR ? undefined : user.id,
              },
            },
          },
          createdAt:
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
    user: TokenPayload,
  ): Promise<ReportPieTypeResponseDto[]> {
    const qb = this.paymentsEntityRepository
      .createQueryBuilder('payments')
      .select('type', 'type')
      .addSelect('COUNT(1)', 'count')
      .addSelect('SUM(sum::numeric::float8)', 'sum')
      .leftJoin('payments.device', 'device')
      .leftJoin('device.posts', 'accesses')
      .leftJoin('accesses.user', 'user');

    if (user.role === UserRoles.MANAGER) {
      qb.andWhere('user.id = :user', { user: user.id });
    }

    if (filter.posts !== undefined && filter.posts.length > 0) {
      qb.andWhere(() => `"deviceId" = ANY(:posts)`, { posts: filter.posts });
    }

    if (filter.date.start !== undefined && filter.date.end !== undefined) {
      qb.andWhere(() => `"createdAt" BETWEEN :start AND :end`, {
        ...filter.date,
      });
    }

    return await qb.groupBy('type').getRawMany<ReportPieTypeResponseDto>();
  }

  async getPostsPie(
    filter: FilterPiePostsDto,
    user: TokenPayload,
  ): Promise<ReportPiePostsResponseDto[]> {
    const qb = this.paymentsEntityRepository
      .createQueryBuilder('payments')
      .select('device.id', 'id')
      .addSelect('device.name', 'name')
      .addSelect('COUNT(1)', 'count')
      .addSelect('SUM(sum::numeric::float8)', 'sum')
      .leftJoin('payments.device', 'device')
      .leftJoin('device.posts', 'accesses')
      .leftJoin('accesses.user', 'user');

    if (user.role === UserRoles.MANAGER) {
      qb.andWhere('user.id = :user', { user: user.id });
    }

    if (filter.posts !== undefined && filter.posts.length > 0) {
      qb.andWhere(() => `"deviceId" = ANY(:posts)`, { posts: filter.posts });
    }

    if (filter.date.start !== undefined && filter.date.end !== undefined) {
      qb.andWhere(() => `"createdAt" BETWEEN :start AND :end`, {
        ...filter.date,
      });
    }

    return await qb
      .groupBy('device.id')
      .addGroupBy('device.name')
      .getRawMany<ReportPiePostsResponseDto>();
  }

  async getDayDebit(
    filter: FilterDayDebitDto,
    user: TokenPayload,
  ): Promise<ReportDayDebitResponseDto> {
    const qb = this.paymentsEntityRepository
      .createQueryBuilder('payments')
      .select('to_char(to_timestamp("createdAt"), \'YYYY-MM-DD\')', 'date')
      .addSelect('COUNT(1)', 'count')
      .addSelect('SUM(sum::numeric::float8)', 'sum')
      .leftJoin('payments.device', 'device')
      .leftJoin('device.posts', 'accesses')
      .leftJoin('accesses.user', 'user');

    if (user.role === UserRoles.MANAGER) {
      qb.andWhere('user.id = :user', { user: user.id });
    }

    if (filter.posts !== undefined && filter.posts.length > 0) {
      qb.andWhere(() => `"deviceId" = ANY(:posts)`, { posts: filter.posts });
    }

    if (filter.date.start !== undefined && filter.date.end !== undefined) {
      qb.andWhere(() => `"createdAt" BETWEEN :start AND :end`, {
        ...filter.date,
      });
    }

    return await qb.groupBy('date').getRawMany<ReportDayDebitResponseDto>();
  }
}
