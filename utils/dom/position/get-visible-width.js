const Range = require('../../range');
const getVisibleDistanceBetweenElements = require('./get-visible-distance-between-elements');

function getVisibleWidth(target, container) {
    const distance = getVisibleDistanceBetweenElements(target, container);
    const visibleXRange = new Range(0, container.offsetWidth);
    const startX = visibleXRange.clamp(distance.x);
    const endX = visibleXRange.clamp(distance.x + target.offsetWidth);
    return endX - startX;
}

module.exports = getVisibleWidth;
