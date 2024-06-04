import { ApiProperty } from '@nestjs/swagger';

export class RequestKaspiDto {
  /**
   * check – запрос на проверку состояния абонента/номера заказа
   *
   *
   * pay – запрос на пополнение баланса абонента/номера заказа
   * */
  @ApiProperty()
  command: 'check' | 'pay';

  /**
   * внутренний номер запроса в системе Kaspi.kz
   * */
  @ApiProperty()
  txn_id: string;

  /**
   * дата учета платежа в системе kaspi.kz (command = pay)
   *
   *
   * format: (ru)ГГГГММДДЧЧММСС
   *
   *
   * example: 20240110123030 - 2024-01-10T12:30:30
   * */
  @ApiProperty({ required: false })
  txn_date?: string | undefined;

  /**
   * идентификатор абонента/номера заказа в информационной системе провайдера
   * */
  @ApiProperty()
  account: string;

  /**
   * сумма к зачислению на лицевой счет абонента
   * (в запросе check значение в переменной sum является фиктивным,
   * передается с терминала по умолчанию и его обрабатывать не нужно)
   */
  @ApiProperty()
  sum: number;

  /**
   * Дополнительные поля, передаваемые провайдером - строки, содержащие буквы, цифры и спецсимволы.
   *
   *
   * (NOTE) Парсить с помощью pipe:
   *
   *
   * (EXAMPLE) data1,data2,…,dataN
   * */
  @ApiProperty({ required: false })
  device_id: string;

  /**
   * payment comment
   * */
  @ApiProperty({ required: false })
  comment: string;
}
