const Range = require('../../range');
const getOffsetBetweenElements = require('./get-offset-between-elements');

function isVisible(target, container) {
    const xRange = new Range(-target.offsetWidth, container.offsetWidth);
    const yRange = new Range(-target.offsetHeight, container.offsetHeight);
    const distance = getOffsetBetweenElements(target, container);
    return xRange.contains(distance.x) && yRange.contains(distance.y);
}

module.exports = isVisible;
