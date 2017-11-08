const Vector2d = require('./vector-2d');

class Vector3d extends Vector2d {
    constructor(x, y,z) {
        super(x, y, z);
    }

    get z() {
        return this.getValues()[2];
    }
}

module.exports = Vector3d;