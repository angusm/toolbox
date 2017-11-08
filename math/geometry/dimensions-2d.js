const Vector = require('./vector');

class Dimensions2D extends Vector {
    constructor(width, height) {
        super(width, height);
    }

    get width() {
        return this.getValues()[0];
    }

    get height() {
        return this.getValues()[1];
    }

    static fromElementOffset(element) {
        return new Dimensions2D(element.offsetWidth, element.offsetHeight);
    }
}

module.exports = Dimensions2D;
