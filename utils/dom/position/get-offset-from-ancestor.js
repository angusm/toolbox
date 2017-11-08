const Vector2d = require('.././geometry/vector-2d');

function getOffsetFromAncestor(element, ancestor) {
    let result = Vector2d.fromElementOffset(element);
    while (element = element.offsetParent && element !== ancestor) {
        result = result.add(Vector2d.fromElementOffset(element));
    }
    return result;
}

module.exports = getOffsetFromAncestor;
