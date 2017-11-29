const MapWrapper = require('./map-wrapper');

const doNothing = () => {};

class DynamicDefaultMap extends MapWrapper {
  constructor(iterable = [], InnerMapClass = Map, defaultFunction = doNothing) {
    super(iterable, InnerMapClass);
    this.defaultFunction_ = defaultFunction;
  }

  get(key) {
    if (!this.has(key)) {
      this.set(key, this.defaultFunction_(key));
    }
    return super.get(key);
  }

  static usingFunction(defaultFunction) {
    return new DynamicDefaultMap([], Map, defaultFunction);
  }
}

module.exports = DynamicDefaultMap;
