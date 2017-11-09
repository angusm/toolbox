const Vector2d = require('.././geometry/vector-2d');
const getOffsetAncestors = require('./get-offset-ancestors');

function getTransformFromAncestor(element, ancestor) {
    return getOffsetAncestors(element, ancestor).reduce(
        (result, element) => {
            return result.add(Vector2d.fromElementTransform(element));
        },
        new Vector2d(0, 0)
    );
}

module.exports = getTransformFromAncestor;
