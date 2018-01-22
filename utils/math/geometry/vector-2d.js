const Matrix = require('../../dom/position/matrix');
const Vector = require('./vector');
const browserHasChrome64TableDisplayOffsetIssues = require('../../dom/style/browser-has-chrome64-table-display-offset-issues');
const isTableDisplayed = require('../../dom/style/is-table-displayed');

class Vector2d extends Vector {
  constructor(x = 0, y = 0) {
    super(x, y);
  }

  get x() {
    return this.getValues()[0];
  }

  get y() {
    return this.getValues()[1];
  }

  static fromElementOffset(element) {
    if (
      element.offsetParent && isTableDisplayed(element.offsetParent) &&
      browserHasChrome64TableDisplayOffsetIssues()
    ) {
      return new Vector2d(
        element.offsetLeft - element.offsetParent.offsetLeft,
        element.offsetTop - element.offsetParent.offsetTop);
    } else {
      return new Vector2d(element.offsetLeft, element.offsetTop);
    }
  }

  static fromMatrix(matrix) {
    return new Vector2d(matrix.translateX, matrix.translateY);
  }

  static fromElementScroll(element) {
    return new Vector2d(element.scrollLeft, element.scrollTop);
  }

  static fromElementTransform(element) {
    return Vector2d.fromMatrix(Matrix.fromElementTransform(element));
  }

  positionElement(element) {
    element.style.left = `${this.x}px`;
    element.style.top = `${this.y}px`;
  }

  positionElementByTranslation(element) {
    element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  toString() {
    return `X: ${this.x}, Y: ${this.y}`;
  }
}

module.exports = Vector2d;