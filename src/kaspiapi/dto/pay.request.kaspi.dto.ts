export interface PayRequestKaspiDto {
  /**
   * check – запрос на проверку состояния абонента/номера заказа
   *
   *
   * pay – запрос на пополнение баланса абонента/номера заказа
   * */
  command: 'pay';

  /**
   * внутренний номер запроса в системе Kaspi.kz
   * */
  txn_id: string;

  txn_date: number;

  /**
   * идентификатор абонента/номера заказа в информационной системе провайдера
   * */
  account: string;

  /**
   * сумма к зачислению на лицевой счет абонента
   * (в запросе check значение в переменной sum является фиктивным,
   * передается с терминала по умолчанию и его обрабатывать не нужно)
   */
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
  device_id: string;

  /**
   * payment comment
   * */
  comment: string;
}
