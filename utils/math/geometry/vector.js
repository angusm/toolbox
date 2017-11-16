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
}

module.exports = Vector;