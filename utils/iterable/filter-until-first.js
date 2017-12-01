const filterUntilTrue = require('./filter-until-true');

function filterUntilFirst(iterable, conditionFn) {
  const results = filterUntilTrue(iterable, conditionFn);
  if (results.length < iterable.length) {
    return [...results, iterable[results.length]];
  } else {
    return results;
  }
}

module.exports = filterUntilFirst;
