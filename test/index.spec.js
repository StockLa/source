const {Observable, from, interval} = require('rxjs');
const {stockService} = require('@service');
const {reduce, startWith} = require('../../../../home/chengyil/.cache/typescript/4.2/node_modules/rxjs/operators/index');
describe('test', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });

  it('should be able to fetch Stock', () => {
    const stocks = stockService.getStock(['ibm']);
    stocks.subscribe(() => {});
  });

  it('should be able to concat', () => {
    interval(100).pipe(
        startWith({name: 'ibm', price: 1}),
    );
  });
});
