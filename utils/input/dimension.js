const CachedElementVector2d = require('./cached-element-vector-2d');

class Dimension extends CachedElementVector2d {
  getDimensions() {
    return this.getCurrentVector_();
  }

  getFirstVectorValue_() {
    return this.element_ ? this.element_.offsetWidth : window.innerWidth;
  }

  getSecondVectorValue_() {
    return this.element_ ? this.element_.offsetHeight : window.innerHeight;
  }
}

module.exports = Dimension;
