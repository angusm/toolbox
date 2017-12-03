const lstrip = require('./lstrip');
const rstrip = require('./rstrip');

function trim(value) {
  return lstrip(rstrip(value));
}

module.exports = trim;