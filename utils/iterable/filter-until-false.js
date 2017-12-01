function filterUntilFalse(iterable, conditionFn) {
  let endIndex = 0;
  while (
  endIndex < iterable.length && conditionFn(iterable[endIndex], endIndex)) {
    endIndex++;
  }
  return iterable.slice(0, endIndex);
}

module.exports = filterUntilFalse;