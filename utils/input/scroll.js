const CachedElementVector = require('./cached-element-vector');
const Vector2d = require('../math/geometry/vector-2d');

class Scroll extends CachedElementVector {
  constructor(element = null) {
    super(element, Vector2d);
  }

  getPosition() {
    return this.getCurrentVector_();
  }

  getFirstVectorValue_() {
    if (this.element_) {
      return this.element_.scrollLeft;
    } else {
      return window.pageXOffset ||
        document.body.scrollLeft ||
        document.documentElement.scrollLeft;
    }
  }

  getSecondVectorValue_() {
    if (this.element_) {
      return this.element_.scrollTop;
    } else {
      return window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;
    }
  }

  isScrollingDown() {
    return this.getDelta().y > 0;
  }

  isScrollingUp() {
    return this.getDelta().y < 0;
  }

  isScrollingRight() {
    return this.getDelta().x > 0;
  }

  isScrollingLeft() {
    return this.getDelta().x < 0;
  }
}

module.exports = Scroll;
