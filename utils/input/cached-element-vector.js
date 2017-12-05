const DynamicDefaultMap = require('../map/dynamic-default');
const Vector = require('../math/geometry/vector');
const renderLoop = require('../render-loop');

const VALUE_LIMIT = 2;

class CachedElementVector {
  constructor(element = null, VectorClass = Vector) {
    if (this.constructor.getInstancesByElement_().has(element)) {
      if (element) {
        console.error('Please use getForElement instead of new.');
      } else {
        console.error('Please use getSingleton instead of new.');
      }
    }
    this.VectorClass_ = VectorClass;
    this.element_ = element;
    this.values_ = [new VectorClass()];
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
    return new this.VectorClass_(
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
    return this.VectorClass_.subtract(...this.getCurrentAndLastValue_());
  }

  hasChanged() {
    return !this.VectorClass_.areEqual(...this.getCurrentAndLastValue_());
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

module.exports = CachedElementVector;
