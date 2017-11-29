const DynamicDefaultMap = require('./dynamic-default');
const MultiValueMap = require('./multi-value');

class MultiValueDynamicDefaultMap extends MultiValueMap {
  constructor(iterable = [],
              InnerMapClass = Map,
              defaultFunction = doNothing) {
    super(iterable, new DynamicDefaultMap([], InnerMapClass, defaultFunction));
  }

  static usingFunction(defaultFunction) {
    return new MultiValueDynamicDefaultMap([], Map, defaultFunction);
  }
}

module.exports = MultiValueMap;
