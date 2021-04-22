const {stockService} = require('@service');
describe('test', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });

  it('should be able to fetch Stock', () => {
    const stocks = stockService.getStock(['ibm']);
    stocks.subscribe(() => {});
  });
});
