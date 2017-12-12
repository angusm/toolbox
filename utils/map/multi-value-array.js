const ArrayMap = require('./array');
const MultiValueMap = require('./multi-value');

class MultiValueArrayMap extends MultiValueMap {
  constructor(iterable = [], InnerMapClass = Map) {
    super();
    this.replaceInnerMap_(new ArrayMap(iterable, InnerMapClass));
  }
}

module.exports = MultiValueArrayMap;
