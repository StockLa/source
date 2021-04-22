const {stockService} = require('@service');
const logger = require('@logger');

function toArray(items) {
  if (Array.isArray(items)) return items;
  return [items];
}

module.exports = {
  async requestStock(req, res) {
    const {stock} = req.query;
    const stocks = stockService.getStocks(toArray(stock));
    const subscription = stocks.subscribe(
        {
          next(data) {
            logger.info('next', {data});
            res.write(data.toString());
          },
          complete() {
            res.end();
          },
        },
    );
    res.set('Content-Type', 'application/stream+json');
    req.on('close', () => subscription.unsubscribe());
  },
};
