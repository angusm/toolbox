const isDef = require('../is-def');

class MapWrapper {
  constructor(iterable = [], InnerMapClass = Map) {
    this.map_ = new InnerMapClass();
    [...iterable].forEach(([key, value]) => this.map_.set(key, value));
  }

  replaceInnerMap_(innerMap) {
    this.map_ = innerMap;
  }

  get length() {
    return this.map_.length;
  }

  get size() {
    return this.map_.size;
  }

  clear() {
    return this.map_.clear();
  }

  delete(key) {
    return this.map_.delete(key);
  }

  entries() {
    return this.map_.entries();
  }

  forEach(callbackFn, thisArg = undefined) {
    const finalThisArg = isDef(thisArg) ? thisArg : this.map_;
    return this.map_.forEach(callbackFn, finalThisArg);
  }

  get(key) {
    return this.map_.get(key);
  }

  has(key) {
    return this.map_.has(key);
  }

  keys() {
    return this.map_.keys();
  }

  set(key, value) {
    return this.map_.set(key, value);
  }

  values() {
    return this.map_.values();
  }

  [Symbol.iterator]() {
    return this.map_[Symbol.iterator]();
  }
}

module.exports = MapWrapper;
