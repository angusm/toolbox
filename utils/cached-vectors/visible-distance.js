const CachedElementVector = require('./cached-element-vector');
const Vector2d = require('../math/geometry/vector-2d');
const getVisibleDistanceBetweenElements = require('../dom/position/get-visible-distance-between-elements');

class VisibleDistance extends CachedElementVector {
  constructor(element, container = null) {
    super(element);
    this.container_ = container;
  }

  static getVectorClass_() {
    return Vector2d;
  }

  getDistance() {
    return this.getCurrentVector_();
  }

  getFirstVectorValue_() {
    return getVisibleDistanceBetweenElements(this.element_, this.container_).x;
  }

  getSecondVectorValue_() {
    return getVisibleDistanceBetweenElements(this.element_, this.container_).y;
  }
}

module.exports = VisibleDistance;
