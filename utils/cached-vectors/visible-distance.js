const CachedElementVector = require('./cached-element-vector');
const Vector2d = require('../math/geometry/vector-2d');
const getVisibleDistanceFromAncestor = require('../dom/position/get-visible-distance-from-ancestor');

class VisibleDistance extends CachedElementVector {
  constructor(element) {
    super(element, Vector2d);
  }

  getDistance() {
    return this.getCurrentVector_();
  }

  getFirstVectorValue_() {
    return getVisibleDistanceFromAncestor(this.element_).x;
  }

  getSecondVectorValue_() {
    return getVisibleDistanceFromAncestor(this.element_).y;
  }
}

module.exports = VisibleDistance;
