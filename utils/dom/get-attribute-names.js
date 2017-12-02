function getAttributeNames(element) {
  return getAsList(element.attributes).map((attribute) => attribute.name);
}

module.exports = getAttributeNames;
