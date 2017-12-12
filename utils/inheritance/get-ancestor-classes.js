const getParentClass = require('./get-parent-class');

function getAncestorClasses(CurrentClass) {
  const ParentClass = getParentClass(CurrentClass);
  return ParentClass ? [ParentClass, ...getAncestorClasses(ParentClass)] : [];
}

module.exports = getAncestorClasses;
