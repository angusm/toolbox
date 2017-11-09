const Vector2d = require('.././geometry/vector-2d');

function accumulateValueFromAncestor(element, ancestor, valueFn) {
    let result = Vector2d.fromElementOffset(element);
    while (element = element.offsetParent && element !== ancestor) {
        result = result.add(Vector2d.fromElementTransform(element));
    }
    return result;
}

module.exports = accumulateValueFromAncestor;
