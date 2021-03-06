const getCommonOffsetAncestor = require('./get-common-offset-ancestor');
const getOffsetFromAncestor = require('./get-offset-from-ancestor');

function getOffsetBetweenElements(a, b) {
    const commonAncestor = getCommonOffsetAncestor(a, b);
    return getOffsetFromAncestor(a, commonAncestor)
        .subtract(getOffsetFromAncestor(b, commonAncestor));
}

module.exports = getOffsetBetweenElements;
