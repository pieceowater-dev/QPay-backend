import { ApiProperty } from '@nestjs/swagger';

export enum DateFilterType {
  ALL_TIME,
  TODAY,
  YESTERDAY,
  THIS_WEEK,
  THIS_MONTH,
  LAST_WEEK,
  LAST_MONTH,
  SELECT_DATES,
}

export class TableDateFilter {
  type: DateFilterType;
  start?: bigint;
  end?: bigint;
  constructor(
    type: DateFilterType,
    start: number | undefined,
    end: number | undefined,
  ) {
    const d = new Date();
    const now = Date.now();
    switch (+type) {
      case DateFilterType.TODAY:
        this.start = BigInt(
          (+new Date(d.toJSON().substr(0, 10) + ' 00:00:00') / 1000) | 0,
        );
        this.end = BigInt(
          (+new Date(d.toJSON().substr(0, 10) + ' 23:59:59') / 1000) | 0,
        );
        break;
      case DateFilterType.YESTERDAY:
        this.start = BigInt(
          (+new Date(
            new Date(now - 86400000).toJSON().substr(0, 10) + ' 00:00:00',
          ) /
            1000) |
            0,
        );
        this.end = BigInt(
          (+new Date(
            new Date(now - 86400000).toJSON().substr(0, 10) + ' 23:59:59',
          ) /
            1000) |
            0,
        );
        break;
      case DateFilterType.THIS_WEEK:
        this.start = BigInt(
          (+new Date(
            new Date(now - +d.getDay() * 86400000 + 86400000)
              .toJSON()
              .substr(0, 10) + ' 00:00:00',
          ) /
            1000) |
            0,
        );
        this.end = BigInt(
          ((+new Date(
            new Date(now - +d.getDay() * 86400000 + 86400000)
              .toJSON()
              .substr(0, 10) + ' 00:00:00',
          ) +
            86400000 * 7 -
            1) /
            1000) |
            0,
        );
        break;
      case DateFilterType.THIS_MONTH:
        this.start = BigInt(
          (+new Date(d.getFullYear(), d.getMonth(), 1) / 1000) | 0,
        );
        this.end = BigInt(
          ((+new Date(d.getFullYear(), d.getMonth() + 1, 0) + 86399999) /
            1000) |
            0,
        );
        break;
      case DateFilterType.LAST_WEEK:
        this.start = BigInt(
          ((+new Date(
            new Date(now - +d.getDay() * 86400000 + 86400000)
              .toJSON()
              .substr(0, 10) + ' 00:00:00',
          ) -
            86400000 * 7) /
            1000) |
            0,
        );
        this.end = BigInt(
          ((+new Date(
            new Date(now - +d.getDay() * 86400000 + 86400000)
              .toJSON()
              .substr(0, 10) + ' 00:00:00',
          ) -
            86399999) /
            1000) |
            0,
        );
        break;
      case DateFilterType.LAST_MONTH:
        this.start = BigInt(
          (+new Date(d.getFullYear(), d.getMonth() - 1, 1) / 1000) | 0,
        );
        this.end = BigInt(
          ((+new Date(d.getFullYear(), d.getMonth(), 0) + 86399999) / 1000) | 0,
        );
        break;
      case DateFilterType.SELECT_DATES:
        this.start = BigInt(start ?? 0);
        this.end = BigInt(end ?? 0);
        break;
      default:
        this.start = undefined;
        this.end = undefined;
        break;
    }
  }
}

export class DateFilter {
  @ApiProperty({ required: false, default: DateFilterType.TODAY })
  dateType: DateFilterType;

  @ApiProperty({ required: false, default: undefined })
  start?: bigint;

  @ApiProperty({ required: false, default: undefined })
  end?: bigint;
}
