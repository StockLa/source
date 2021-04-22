function round(number) {
  return Number(number).toFixed(2);
}

function isZero(number) {
  return round(number) === '0.00';
}

function isGrowth() {
  return Math.random() * 10 > 3;
}

module.exports = class Stock {
  static create(name) {
    return new Stock(name, 100 * Math.random());
  }

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }


  delta() {
    const delta = this.price * Math.random();
    if (isZero(this.price) || isGrowth()) {
      return new Stock(this.name, this.price + delta);
    } else {
      return new Stock(this.name, this.price - delta);
    }
  }

  toString() {
    return JSON.stringify({
      name: this.name,
      price: round(this.price),
    });
  }
};
