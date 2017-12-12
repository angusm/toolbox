function getParentClass(Class) {
  return Object.getPrototypeOf(Class);
}

module.exports = getParentClass;
