const frameMemoize = require('../../frame-memoize');

function getOffsetAncestors(element, terminusAncestor = null) {
    if (!element || element === terminusAncestor) {
        return [];
    }

    const result =
      [element].concat(
        getOffsetAncestors(element.offsetParent, terminusAncestor));
    cache.set(element, terminusAncestor, result);

    return result;
}

module.exports = frameMemoize(getOffsetAncestors);
