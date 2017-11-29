const CachedElementVector2d = require('./cached-element-vector-2d');

class Scroll extends CachedElementVector2d {
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
