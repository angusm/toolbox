function getOffsetAncestors(element, terminusAncestor = null) {
    const result = [element];
    while (
        element.offsetParent &&
        element.offsetParent !== terminusAncestor &&
        (element = element.offsetParent)
    ) {
        result.push(element);
    }
    return result;
}

module.exports = getOffsetAncestors;
