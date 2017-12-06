const frameMemoize = require('../../frame-memoize');
const getVisibleDistanceFromAncestor = require('./get-visible-distance-from-ancestor');

function getVisibleDistanceBetweenElements(a, b) {
  if (b) {
    return getVisibleDistanceFromAncestor(a, null)
      .subtract(getVisibleDistanceFromAncestor(b, null));
  } else {
    return getVisibleDistanceFromAncestor(a, null);
  }
}

module.exports = frameMemoize(getVisibleDistanceBetweenElements);
