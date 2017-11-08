const Range = require('../../range');
const getDistanceBetweenElements = require('./get-distance-between-elements');

function getVisibleWidth(target, container) {
    const distance = getDistanceBetweenElements(target, container);
    const visibleXRange = new Range(0, container.offsetWidth);
    const startX = visibleXRange.clamp(distance.x);
    const endX = visibleXRange.clamp(distance.x + target.offsetWidth);
    return endX - startX;
}

module.exports = getVisibleWidth;
