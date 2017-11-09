const Range = require('../../range');
const getVisibleDistanceBetweenElements = require('./get-visible-distance-between-elements');

function getVisibleHeight(target, container) {
    const distance = getVisibleDistanceBetweenElements(target, container);
    const visibleYRange = new Range(0, container.offsetHeight);
    const startY = visibleYRange.clamp(distance.y);
    const endY = visibleYRange.clamp(distance.y + target.offsetHeight);
    return endY - startY;
}

module.exports = getVisibleHeight;
