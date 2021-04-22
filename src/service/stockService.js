const {Stock} = require('@model');
const {interval, Observable, Subject, combineLatest} = require('rxjs');
const {switchMap} = require('rxjs/operators');
const config = require('config');

class StockService {
  constructor(timeInterval) {
    this.stockSubscriptions = {};
    this.timer$ = new Subject();
    interval(timeInterval).subscribe(this.timer$);
  }

  getStocks(stocks) {
    const all = stocks.map( (name) => this.getStock(name));
    return combineLatest(all).pipe((all) => all);
  }

  getStock(name) {
    if (!this.stockSubscriptions[name]) {
      const subject = this.stockSubscriptions[name] = new Subject(); ;
      let stock = Stock.create(name);
      this.timer$.pipe(switchMap(() => {
        return new Observable((observer) => {
          observer.next((() => {
            stock = stock.delta();
            return stock;
          })());
        });
      })).subscribe(subject);
    }
    return this.stockSubscriptions[name];
  }
};

module.exports = new StockService(config.intervalForStock);