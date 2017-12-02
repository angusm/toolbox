function getAsList(iterable) {
  return Object.keys(iterable).map((key) => iterable[key]);
}

module.exports = getAsList;
