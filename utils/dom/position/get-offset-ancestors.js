const frameMemoize = require('../../frame-memoize');

const memoized = frameMemoize(getOffsetAncestors);

function getOffsetAncestors(element, terminusAncestor = null) {
    if (!element || element === terminusAncestor) {
        return [];
    }
    return [element].concat(
        memoized(element.offsetParent, terminusAncestor));
}

module.exports = memoized;
