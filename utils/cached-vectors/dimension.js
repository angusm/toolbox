const CachedElementVector = require('./cached-element-vector');
const Dimensions2d = require('../math/geometry/dimensions-2d');

class Dimension extends CachedElementVector {
  constructor(element = null) {
    super(element, Dimensions2d);
  }

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
