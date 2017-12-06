const Range = require('../../range');
const getVisibleDistanceBetweenElements = require('./get-visible-distance-between-elements');

function getVisibleWidth(target, container = null) {
    const distance =
      getVisibleDistanceBetweenElements(target, container);
    const containerWidth =
      container ? container.offsetWidth : window.innerWidth;
    const visibleXRange = new Range(0, containerWidth);
    const startX = visibleXRange.clamp(distance.x);
    const endX = visibleXRange.clamp(distance.x + target.offsetWidth);
    return endX - startX;
}

module.exports = getVisibleWidth;
