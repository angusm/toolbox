class Matrix {
    constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
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

    translate(vector) {
        const newX = this.tx_ + vector.x;
        const newY = this.ty_ + vector.y;
        return new Matrix(this.a_, this.b_, this.c_, this.d_, newX, newY);
    }

    setTranslateX(value) {
        return new Matrix(this.a_, this.b_, this.c_, this.d_, value, this.ty_);
    }

    setTranslateY(value) {
        return new Matrix(this.a_, this.b_, this.c_, this.d_, this.tx_, value);
    }

    static parseFromString(str) {
        const valuesStr = str.split('matrix(').splice(-1)[0].split(')')[0];
        const values = valuesStr.split(',').map((str) => str.trim());
        if (!values.length || values[0] === 'none') {
            return new Matrix();
        } else {
            return new Matrix(...values);
        }
    }

    static fromElementTransform(element) {
        return Matrix.parseFromString(
            window.getComputedStyle(element).transform);
    }

    toCSSString() {
        const values = [this.a_, this.b_, this.c_, this.d_, this.tx_, this.ty_];
        return `matrix(${values.join(',')})`;
    }

    applyToElementTransform(element) {
        element.style.transform = this.toCSSString();
    }
}

module.exports = Matrix;
