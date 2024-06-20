import { KaspiResult } from '../types/KaspiResult';

export interface ResponseKaspiDto {
  /**
   * номер транзакции в системе, который передается провайдеру в переменной txn_id.
   * */
  txn_id: string;

  /**
   * Уникальный номер оплаты (в базе провайдера), целое число длиной до 20 знаков.
   * Этот элемент должен возвращаться провайдером после запроса на оплату (запроса «pay»).
   * При ответе на запрос на проверку состояния абонента (запрос «check») его возвращать не нужно – не обрабатывается.
   * */
  pry_txn_id?: string;

  /**
   * Код результата завершения запроса.
   * Возвращая result=0 на запрос «pay», провайдер сообщает об успешном завершении операции пополнения баланса.
   * Система полностью завершает обработку данной транзакции.
   */
  result: KaspiResult;

  /**
   * необходимая сумма платежа по запрашиваемому лицевому счету, номеру заказа и т.д.,
   * дробное число с точностью до сотых, в качестве разделителя используется «.» (точка).
   * Если сумма представляет целое число, то оно все равно дополняется точкой и нулями, например – «200.00»
   */
  sum: string;

  /**
   * Необязательный элемент – комментарий завершения операции
   * */
  comment?: string;
}

export interface ResponseKaspiCheckDto {
  /**
   * номер транзакции в системе, который передается провайдеру в переменной txn_id.
   * */
  txn_id: string;

  /**
   * Код результата завершения запроса.
   * Возвращая result=0 на запрос «pay», провайдер сообщает об успешном завершении операции пополнения баланса.
   * Система полностью завершает обработку данной транзакции.
   */
  result: KaspiResult;

  /**
   * необходимая сумма платежа по запрашиваемому лицевому счету, номеру заказа и т.д.,
   * дробное число с точностью до сотых, в качестве разделителя используется «.» (точка).
   * Если сумма представляет целое число, то оно все равно дополняется точкой и нулями, например – «200.00»
   */
  sum: string;

  /**
   * Company bin
   * */
  bin: string;

  /**
   * Tariffs array
   * */
  tariffs: Array<{ sum: string }>;
}

export interface ResponseKaspiPayDto {
  /**
   * номер транзакции в системе, который передается провайдеру в переменной txn_id.
   * */
  txn_id: string;

  /**
   * Код результата завершения запроса.
   * Возвращая result=0 на запрос «pay», провайдер сообщает об успешном завершении операции пополнения баланса.
   * Система полностью завершает обработку данной транзакции.
   */
  result: KaspiResult;

  /**
   * необходимая сумма платежа по запрашиваемому лицевому счету, номеру заказа и т.д.,
   * дробное число с точностью до сотых, в качестве разделителя используется «.» (точка).
   * Если сумма представляет целое число, то оно все равно дополняется точкой и нулями, например – «200.00»
   */
  sum: string;

  /**
   * Company bin
   * */
  bin: string;

  /**
   * Уникальный номер оплаты (в базе провайдера), целое число длиной до 20 знаков.
   * Этот элемент должен возвращаться провайдером после запроса на оплату (запроса «pay»).
   * При ответе на запрос на проверку состояния абонента (запрос «check») его возвращать не нужно – не обрабатывается.
   * */
  pry_txn_id: string;

  /**
   * Необязательный элемент – комментарий завершения операции
   * */
  comment: string;
}
