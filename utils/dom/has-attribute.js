const getAsList = require('../iterable/get-as-list');

function hasAttribute(element, attributeName) {
  return getAsList(element.attributes)
    .some((attribute) => attribute.name === attributeName);
}

module.exports = hasAttribute;
