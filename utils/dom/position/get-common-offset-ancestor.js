const areEqual = require('../../are-equal');
const getOffsetAncestors = require('./get-offset-ancestors');
const zip = require('../../iterable/zip');

function getCommonOffsetAncestor(...elements) {
    const reversedAncestorLists =
        elements.map((element) => getOffsetAncestors(element)).reverse();
    const ancestorIndex = getLastMatchingIndex(...reversedAncestorLists);
    return reversedAncestorLists[0][ancestorIndex];
}

function getLastMatchingIndex(...lists) {
    const zippedValues = zip(lists);
    let matchIndex;
    for (matchIndex = 0; matchIndex < zippedValues.length; matchIndex++) {
        if (!areEqual(...zippedValues[matchIndex])) {
            return matchIndex - 1;
        }
    }
    return matchIndex;
}

module.exports = getCommonOffsetAncestor;
