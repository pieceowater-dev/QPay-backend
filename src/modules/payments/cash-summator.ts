interface CashPaymentObject {
  sum: number;
  time: number;
  callback: (sum: number) => Promise<void>;
}

export class CashSummator {
  static instance: CashSummator;

  private constructor() {}

  static getInstance(): CashSummator {
    if (!this.instance) {
      this.instance = new CashSummator();
      this.instance.runner();
    }
    return this.instance;
  }

  private readonly timeInterval = 5000;
  private readonly cpoInterval = 30000;

  private readonly paymentsMap: Map<number, CashPaymentObject> = new Map([]);

  sum(deviceId: number, sum: number, callback: (sum: number) => Promise<void>) {
    const activePayment = this.paymentsMap.get(deviceId);

    if (activePayment) {
      activePayment.sum += sum;
      activePayment.time = +new Date();
    } else {
      this.paymentsMap.set(deviceId, {
        sum,
        callback,
        time: +new Date(),
      });
    }
  }

  private runner() {
    setInterval(() => {
      for (const [deviceId, cpo] of this.paymentsMap.entries()) {
        if (cpo.time + this.cpoInterval < +new Date()) {
          this.paymentsMap.delete(deviceId);

          console.log('[CASH-PAYMENT-START] trying to save cash payment');
          void cpo.callback(cpo.sum).catch((error) => {
            console.log(
              '[CASH-PAYMENT-ERROR] Can not save cash payment: ' +
                error.message,
              error,
            );
          });
        }
      }
    }, this.timeInterval);
  }
}
