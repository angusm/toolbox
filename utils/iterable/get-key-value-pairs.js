const getAsList = require('./get-as-list');
const zip = require('./zip');

function getKeyValuePairs(value) {
  return zip(Object.keys(value), getAsList(value));
}

module.exports = getKeyValuePairs;