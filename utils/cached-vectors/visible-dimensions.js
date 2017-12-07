const CachedElementVector = require('./cached-element-vector');
const Dimensions2d = require('../math/geometry/dimensions-2d');
const getVisibleDimensions = require('../dom/position/get-visible-dimensions');

class VisibleDimensions extends CachedElementVector {
  constructor(element) {
    super(element, Dimensions2d);
  }

  getDimensions() {
    return this.getCurrentVector_();
  }

  getFirstVectorValue_() {
    return getVisibleDimensions(this.element_).width;
  }

  getSecondVectorValue_() {
    return getVisibleDimensions(this.element_).height;
  }
}

module.exports = VisibleDimensions;
