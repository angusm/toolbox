const DynamicDefaultMap = require('./dynamic-default');
const MultiValueMap = require('./multi-value');

class MultiValueDynamicDefaultMap extends MultiValueMap {
  constructor(iterable = [],
              InnerMapClass = Map,
              defaultFunction = doNothing) {
    super(
      iterable,
      new DynamicDefaultMap(
        [], InnerMapClass, this.expandDefaultFunction_(defaultFunction)));
  }

  expandDefaultFunction_(defaultFunction) {
    return (key) => defaultFunction(...this.convertToValues_(key));
  }

  static usingFunction(defaultFunction) {
    return new MultiValueDynamicDefaultMap([], Map, defaultFunction);
  }
}

module.exports = MultiValueMap;
