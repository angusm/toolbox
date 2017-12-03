function lstrip(value) {
  let startIndex = 0;
  while (value[startIndex] === ' ') {
    startIndex++;
  }
  return value.slice(startIndex);
}

module.exports = lstrip;