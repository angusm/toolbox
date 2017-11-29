const frameMemoize = require('../../frame-memoize');

function getOffsetAncestors(element, terminusAncestor = null) {
    if (!element || element === terminusAncestor) {
        return [];
    }
    return [element].concat(
        getOffsetAncestors(element.offsetParent, terminusAncestor));
}

module.exports = frameMemoize(getOffsetAncestors);
