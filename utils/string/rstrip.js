function rstrip(value) {
  let endIndex = value.length;
  while (value[endIndex - 1] === ' ') {
    endIndex--;
  }
  return value.slice(0, endIndex);
}

module.exports = rstrip;