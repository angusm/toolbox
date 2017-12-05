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
      return window.pageXOffset || document.body.scrollLeft;
    }
  }

  getSecondVectorValue_() {
    if (this.element_) {
      return this.element_.scrollTop;
    } else {
      return window.pageYOffset || document.body.scrollTop;
    }
  }
}

module.exports = Scroll;
