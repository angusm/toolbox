function getSubarraysOfLength(value, length) {
  const result = [];
  while (value) {
    result.push(value.slice(0, length));
    value = value.slice(length)
  }
  return result;
}

module.exports = getSubarraysOfLength;
