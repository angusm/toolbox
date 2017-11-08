const Vector = require('./vector');

class Dimensions3D extends Vector {
    constructor(width, height, depth) {
        super(width, height, depth);
    }

    get depth() {
        return this.getValues()[2];
    }
}

module.exports = Dimensions3D;
