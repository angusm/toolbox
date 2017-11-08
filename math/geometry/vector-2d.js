const Vector = require('./vector');

class Vector2d extends Vector {
    constructor(x, y) {
        super(x, y);
    }

    get x() {
        return this.getValues()[0];
    }

    get y() {
        return this.getValues()[1];
    }

    static fromElementOffset(element) {
        return new Vector2d(element.offsetLeft, element.offsetTop);
    }
}

module.exports = Vector2d;