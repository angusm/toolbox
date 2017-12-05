const frameMemoize = require('../../frame-memoize');
const getVisibleDistanceFromAncestor = require('./get-visible-distance-from-ancestor');

function getVisibleDistanceBetweenElements(a, b) {
    return getVisibleDistanceFromAncestor(a, null)
        .subtract(getVisibleDistanceFromAncestor(b, null));
}

module.exports = frameMemoize(getVisibleDistanceBetweenElements);
