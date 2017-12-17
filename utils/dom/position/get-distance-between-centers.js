const Dimensions2d = require('../../math/geometry/dimensions-2d');
const frameMemoize = require('../../frame-memoize');
const getVisibleDistanceBetweenElements = require('./get-visible-distance-between-elements');

function getDistanceBetweenCenters(a, b) {
  const distance = getVisibleDistanceBetweenElements(a, b);
  const elementSize = Dimensions2d.fromElementOffset(a);
  let containerSize;
  if (b) {
    containerSize = Dimensions2d.fromElementOffset(b);
  } else {
    containerSize = new Dimensions2d(window.innerWidth, window.innerHeight);
  }
  return distance.add(elementSize.subtract(containerSize));
}

module.exports = frameMemoize(getDistanceBetweenCenters);
