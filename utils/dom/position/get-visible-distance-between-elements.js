const getCommonOffsetAncestor = require('./get-common-offset-ancestor');
const getVisibleDistanceFromAncestor = require('./get-visible-distance-from-ancestor');

function getVisibleDistanceBetweenElements(a, b) {
    const commonAncestor = getCommonOffsetAncestor(a, b);
    return getVisibleDistanceFromAncestor(a, commonAncestor)
        .subtract(getVisibleDistanceFromAncestor(b, commonAncestor));
}

module.exports = getVisibleDistanceBetweenElements;
