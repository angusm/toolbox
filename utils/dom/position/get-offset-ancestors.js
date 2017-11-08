function getOffsetAncestors(element) {
    const result = [element];
    while (element = element.offsetParent) {
        result.push(element);
    }
    return result;
}

module.exports = getOffsetAncestors;
