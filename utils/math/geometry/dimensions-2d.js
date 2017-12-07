const Range = require('../../range');
const Vector = require('./vector');

class Dimensions2D extends Vector {
    constructor(width = 0, height = 0) {
        super(width, height);
    }

    get width() {
        return this.getValues()[0];
    }

    get height() {
        return this.getValues()[1];
    }

    sizeElement(element) {
        element.style.width = `${this.width}px`;
        element.style.height = `${this.height}px`;
    }

    static fromElementOffset(element) {
        return new Dimensions2D(element.offsetWidth, element.offsetHeight);
    }

    asRanges() {
        return [new Range(0, this.width), new Range(0, this.height)];
    }

    getArea() {
        return this.width * this.height;
    }
}

module.exports = Dimensions2D;
