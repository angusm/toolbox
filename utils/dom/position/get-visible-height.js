const Range = require('../../range');
const getVisibleDistanceBetweenElements = require('./get-visible-distance-between-elements');

function getVisibleHeight(target, container = null) {
  const distance =
    getVisibleDistanceBetweenElements(target, container);
  const containerHeight =
    container ? container.offsetHeight : window.innerHeight;
  const visibleYRange = new Range(0, containerHeight);
  const startY = visibleYRange.clamp(distance.y);
  const endY = visibleYRange.clamp(distance.y + target.offsetHeight);
  return endY - startY;
}

module.exports = getVisibleHeight;
