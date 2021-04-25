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
    return new Stock(name, 10);
  }

  constructor(name, price, change) {
    this.name = name;
    this.price = price;
    this.change = change;
    this.dateTime = Date.now();
    this.deltas = [0.1, 0.2, 0.3, 0.4];
  }

  delta() {
    const delta = this.price *
      this.deltas[Math.floor(Math.random() * this.deltas.length)];
    if (isZero(this.price) || isGrowth()) {
      return new Stock(this.name, this.price + delta, delta);
    } else {
      return new Stock(this.name, this.price - delta, -delta);
    }
  }

  toString() {
    return JSON.stringify({
      name: this.name,
      price: round(this.price),
      change: round(this.change),
      dateTime: this.dateTime,
    });
  }

  toJSON() {
    return {
      name: this.name,
      price: round(this.price),
      change: round(this.change),
      dateTime: this.dateTime,
    };
  }
};
