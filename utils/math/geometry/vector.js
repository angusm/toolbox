const areListValuesEqual = require('../../iterable/are-list-values-equal');
const sum = require('../sum');
const zip = require('../../iterable/zip');

class Vector {
  constructor(...values) {
    this.values_ = values;
  }

  static add(...vectors) {
    const values = vectors.map((vector) => vector.getValues());
    const summedValues =
      zip(...values).map((zippedVals) => sum(...zippedVals));
    return new this[Symbol.species](...summedValues);
  }

  add(...vectors) {
    return this.constructor.add(this, ...vectors);
  }

  static invert(vector) {
    return new this[Symbol.species](...vector.getValues().map((val) => -val));
  }

  invert() {
    return this.constructor.invert(this);
  }

  static subtract(minuend, ...subtrahends) {
    return this.add(
      minuend, ...subtrahends.map((subtrahend) => subtrahend.invert()));
  }

  subtract(...subtrahends) {
    return this.constructor.subtract(this, ...subtrahends);
  }

  getValues() {
    return this.values_;
  }

  static get [Symbol.species]() {
    return this;
  }

  static sumDeltas(...vectors) {
    return this[Symbol.species].add(
      ...this[Symbol.species].getDeltas(...vectors));
  }

  static getDeltas(...vectors) {
    return vectors.reduce((acc, vector, index) => {
      return index ? [...acc, vectors[index - 1].subtract(vector)] : acc;
    }, []);
  }

  static scale(vector, amount) {
    return new this[Symbol.species](
      ...vector.getValues().map((value) => value * amount));
  }

  scale(amount) {
    return this.constructor.scale(this, amount);
  }

  static areEqual(...vectors) {
    return areListValuesEqual(...vectors.map((v) => v.getValues()));
  }

  equals(...vectors) {
    return this.constructor.areEqual(this, ...vectors);
  }

  getLength() {
    return Math.sqrt(
      sum(...this.getValues().map((value) => Math.pow(value, 2))));
  }
}

module.exports = Vector;