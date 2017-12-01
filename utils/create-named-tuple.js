const zip = require('./iterable/zip');

function createNamedTuple(...names) {
  class NamedTuple {
    constructor(...values) {
      if (names.length != values.length) {
        console.error('Names and values length mismatch for named tuple');
      }

      zip(names, values).forEach(
        ([name, value]) => {
          this[name] = value;
        });
    }
  }

  return NamedTuple;
}

module.exports = createNamedTuple;
