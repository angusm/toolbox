function getAttributeValue(element, attributeName) {
  const attribute = element.attributes.getNamedItem(attributeName);
  return attribute ? attribute.value : undefined;
}

module.exports = getAttributeValue;
