const Vector2d = require('../../math/geometry/vector-2d');
const getOffsetAncestors = require('./get-offset-ancestors');

function getOffsetFromAncestor(element, ancestor) {
    return getOffsetAncestors(element, ancestor).reduce(
        (result, element) => {
            return result.add(Vector2d.fromElementOffset(element));
        },
        new Vector2d(0, 0)
    );
}

module.exports = getOffsetFromAncestor;
