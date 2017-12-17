const getDistanceBetweenCenters = require('./get-distance-between-centers');
const min = require('../../iterable/min');

function getClosestToCenter(elements, container = null) {
    return min(
      elements,
      (el) => Math.abs(getDistanceBetweenCenters(el, container).getLength()));
}

module.exports = getClosestToCenter;
