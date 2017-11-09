class Matrix {
    contructor(a, b, c, d, tx, ty) {
        this.a_ = a;
        this.b_ = b;
        this.c_ = c;
        this.d_ = d;
        this.tx_ = tx;
        this.ty_ = ty;
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
        return new Matrix(...values);
    }

    static fromElementTransform(element) {
        return Matrix.parseFromString(
            window.getComputedStyle(element).transform);
    }
}

module.exports = Matrix;
