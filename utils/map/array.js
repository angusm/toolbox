const DynamicDefaultMap = require('./dynamic-default');
const MapWrapper = require('./map-wrapper');

class ArrayMap extends MapWrapper {
  constructor(iterable = [], InnerMapClass = Map) {
    super();
    this.replaceInnerMap_(
      new DynamicDefaultMap(iterable, InnerMapClass, () => []));
  }

  get(key) {
    // Return only copies.
    return super.get(key);
  }

  set(key, value) {
    if (!(value instanceof Array)) {
      throw new Error('Values set on to ArrayMap must be arrays');
    }
    super.set(key, value);
  }
}

module.exports = ArrayMap;
