const DynamicDefaultMap = require('../map/dynamic-default');
const Vector2d = require('../math/geometry/vector-2d');
const renderLoop = require('../render-loop');

const ZERO_VECTOR = new Vector2d();
const VALUE_LIMIT = 2;

class CachedElementVector2d {
  constructor(element = null) {
    if (this.constructor.getInstancesByElement_().has(element)) {
      if (element) {
        console.error('Please use getForElement instead of new.');
      } else {
        console.error('Please use getSingleton instead of new.');
      }
    }
    this.element_ = element;
    this.values_ = [ZERO_VECTOR];
    this.init_();
  }

  static getInstancesByElement_() {
    return this.cache_ || (
      this.cache_ =
        new DynamicDefaultMap.usingFunction((element) => new this(element)));
  }

  init_() {
    this.render_();
  }

  getLastValue_() {
    return this.values_.slice(-1)[0];
  }

  getFirstVectorValue_() {
    console.error('getFirstVectorValue_ must be overridden by child class');
  }

  getSecondVectorValue_() {
    console.error('getSecondVectorValue_ must be overridden by child class');
  }

  getCurrentVector_() {
    return new Vector2d(
      this.getFirstVectorValue_(), this.getSecondVectorValue_());
  }

  render_() {
    renderLoop.premeasure(() => {
      this.values_ =
        this.values_.slice(-(this.constructor.getValueLimit() - 1))
          .concat([this.getCurrentVector_()]);
      renderLoop.cleanup(() => this.render_());
    });
  }

  getCurrentAndLastValue_() {
    return this.values_.slice(-2);
  }

  getDelta() {
    return Vector2d.subtract(...this.getCurrentAndLastValue_());
  }

  hasChanged() {
    return !Vector2d.areEqual(...this.getCurrentAndLastValue_());
  }

  static getValueLimit() {
    return VALUE_LIMIT;
  }

  static getForElement(element) {
    return this.getInstancesByElement_().get(element);
  }

  static getSingleton() {
    return this.getInstancesByElement_().get(null);
  }
}

module.exports = CachedElementVector2d;
