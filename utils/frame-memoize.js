const MultiValueMap = require('./map/multi-value-map');
const renderLoop = require('./render-loop');

function frameMemoize(fn) {
  const cache = new MultiValueMap();

  function clearCache() {
    renderLoop.cleanup(() => {
      cache.clear();
      renderLoop.measure(() => clearCache());
    });
  }
  clearCache();

  return (...args) => {
    if (cache.has(...args)) {
      return cache.get(...args);
    } else {
      const result = fn(...args);
      cache.set(...args, result);
      return result;
    }
  }
}

module.exports = frameMemoize;