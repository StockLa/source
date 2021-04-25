const {stockService} = require('@service');
const {buildOkResponse} = require('@builder');
const {map} = require('rxjs/operators');
const logger = require('@logger');

function toArray(items) {
  if (Array.isArray(items)) return items;
  return [items];
}

module.exports = {
  async requestStock(req, res) {
    const {stock} = req.query;
    const stocks = stockService.getStocks(toArray(stock));
    const subscription = stocks.pipe(
        map((data) => buildOkResponse(data)),
    ).subscribe({
      next(response) {
        res.write(JSON.stringify(response));
      },
      complete() {
        res.end();
      },
    });
    res.set('Content-Type', 'application/stream+json');
    req.on('close', () => subscription.unsubscribe());
  },
};
