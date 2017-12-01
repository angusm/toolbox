const filterUntilFalse = require('./filter-until-false');

function filterUntilTrue(iterable, conditionFn) {
  return filterUntilFalse(iterable, (v, i) => !conditionFn(v, i));
}

module.exports = filterUntilTrue;
