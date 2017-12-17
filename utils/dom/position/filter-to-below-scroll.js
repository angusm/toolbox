const getVisibleDistanceBetweenElements = require('./get-visible-distance-between-elements');

function filterToBelowScroll(elements, container = null) {
    return [...elements].filter(
      (element) => getVisibleDistanceBetweenElements(element, container) >= 0);
}

module.exports = filterToBelowScroll;
