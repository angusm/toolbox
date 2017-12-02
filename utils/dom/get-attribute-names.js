const getAsList = require('../iterable/get-as-list');

function getAttributeNames(element) {
  return getAsList(element.attributes).map((attribute) => attribute.name);
}

module.exports = getAttributeNames;
