const getOffsetFromAncestor = require('./get-offset-from-ancestor');
const getTransformFromAncestor = require('./get-transform-from-ancestor');

function getVisibleDistanceFromAncestor(element, ancestor) {
    return getOffsetFromAncestor(element, ancestor)
        .add(getTransformFromAncestor(element, ancestor));
}

module.exports = getVisibleDistanceFromAncestor;
