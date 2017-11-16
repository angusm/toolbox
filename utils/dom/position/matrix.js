class Matrix {
    constructor(a = 0, b = 0, c = 0, d = 0, tx = 0, ty = 0) {
        this.a_ = parseFloat(a);
        this.b_ = parseFloat(b);
        this.c_ = parseFloat(c);
        this.d_ = parseFloat(d);
        this.tx_ = parseFloat(tx);
        this.ty_ = parseFloat(ty);
    }

    get translateX() {
        return this.tx_;
    }

    get translateY() {
        return this.ty_;
    }

    static parseFromString(str) {
        const valuesStr = str.split('matrix(').splice(-1)[0].split(')')[0];
        const values = valuesStr.split(',').map((str) => str.trim());
        if (values.length && values[0] === 'none') {
            return new Matrix();
        } else {
            return new Matrix(...values);
        }
    }

    static fromElementTransform(element) {
        return Matrix.parseFromString(
            window.getComputedStyle(element).transform);
    }
}

module.exports = Matrix;
