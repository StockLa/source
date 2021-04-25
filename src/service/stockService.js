const {Stock} = require('@model');
const {interval, Observable, Subject, combineLatest, generate} = require('rxjs');
const {tap, switchMap, map, flatMap} = require('rxjs/operators');
const config = require('config');

function newStock(name) {
  return generate(new Stock(name), () => true, (stock) => stock.delta());
}

class StockService {
  constructor(timeInterval) {
    this.stockSubscriptions = {};
    this.timer$ = new Subject();
    interval(timeInterval).subscribe(this.timer$);
  }

  getStocks(stocks) {
    const all = stocks.map( (name) => this.getStock(name));
    return combineLatest(all);
  }

  getStock(name) {
    if (!this.stockSubscriptions[name]) {
      const subject = this.stockSubscriptions[name] = new Subject();
      const stock = Stock.create(name);
      this.timer$.pipe(
          map(() => stock.delta()),
      ).subscribe(subject);
    }
    return this.stockSubscriptions[name];
  }
};

module.exports = new StockService(config.intervalForStock);
