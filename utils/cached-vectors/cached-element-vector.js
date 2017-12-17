const DynamicDefaultMap = require('../map/dynamic-default');
const MultiValueDynamicDefaultMap = require('../map/multi-value-dynamic-default');
const Vector = require('../math/geometry/vector');
const renderLoop = require('../render-loop');

const VALUE_LIMIT = 2;

const caches =
  DynamicDefaultMap.usingFunction(
    (Class) => {
      return new MultiValueDynamicDefaultMap.usingFunction(
        (...args) => new Class(...args));
    });

class CachedElementVector {
  constructor(element = null, ...args) {
    if (this.constructor.getInstancesByElement_().has(element, ...args)) {
      if (element) {
        console.error('Please use getForElement instead of new.');
      } else {
        console.error('Please use getSingleton instead of new.');
      }
    }
    this.element_ = element;
    this.values_ = [new (this.getVectorClass_())()];
    this.init_();
  }

  static getInstancesByElement_() {
    return caches.get(this);
  }

  static getVectorClass_() {
    return Vector;
  }

  getVectorClass_() {
    return this.constructor.getVectorClass_();
  }

  init_() {
    // Init values so that instances can be created during a measure step if
    // necessary.
    renderLoop.measure(() => this.measureValues_());
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
    return new (this.getVectorClass_())(
      this.getFirstVectorValue_(), this.getSecondVectorValue_());
  }

  render_() {
    renderLoop.premeasure(() => {
      this.measureValues_();
      renderLoop.cleanup(() => this.render_());
    });
  }

  measureValues_() {
    this.values_ =
      this.values_
        .slice(-(this.constructor.getValueLimit() - 1))
        .concat([this.getCurrentVector_()]);
  }

  getCurrentAndLastValue_() {
    return this.values_.slice(-2);
  }

  getDelta() {
    return this.getVectorClass_().subtract(...this.getCurrentAndLastValue_());
  }

  hasChanged() {
    return !this.getVectorClass_().areEqual(...this.getCurrentAndLastValue_());
  }

  static getValueLimit() {
    return VALUE_LIMIT;
  }

  static getForElement(...args) {
    return this.getInstancesByElement_().get(...args);
  }

  static getSingleton() {
    return this.getInstancesByElement_().get(null);
  }
}

module.exports = CachedElementVector;
