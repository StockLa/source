const {Stock} = require('@model');
const {interval, Subject, combineLatest, of} = require('rxjs');
const {map, mergeMap} = require('rxjs/operators');
const config = require('config');

class StockService {
  constructor(timeInterval) {
    this.stockSubscriptions = {};
    this.timer$ = new Subject();
    interval(timeInterval).subscribe(this.timer$);
  }

  getStocks(stocks) {
    const all = stocks.map((name) => this.getStock(name));
    return combineLatest(all).pipe(
        map((all) => {
          return all.reduce((map, stock) => {
            map[stock.name] = stock;
            return map;
          }, {});
        }),
    );
  }

  getStock(name) {
    if (!this.stockSubscriptions[name]) {
      const subject = this.stockSubscriptions[name] = new Subject();
      this.newStockObservable(name).subscribe(subject);
    }
    return this.stockSubscriptions[name];
  }

  newStockObservable(name) {
    return of(Stock.create(name))
        .pipe(
            mergeMap((stock)=> this.timer$.pipe(
                map(() => stock.delta()),
            )),
        );
  }
};

module.exports = new StockService(config.intervalForStock);
