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
        return new Vector(...summedValues);
    }

    add(...vectors) {
        return Vector.add(this, ...vectors);
    }

    static invert(vector) {
        return new Vector(...vector.getValues().map((val) => -val));
    }

    invert() {
        return Vector.invert(this);
    }

    static subtract(minuend, ...subtrahends) {
        return Vector.add(
            minuend, ...subtrahends.map((subtrahend) => subtrahend.invert()));
    }

    subtract(...subtrahends) {
        return Vector.subtract(this, ...subtrahends);
    }

    getValues() {
        return this.values_;
    }
}

module.exports = Vector;