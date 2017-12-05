const Vector2d = require('../../math/geometry/vector-2d');
const frameMemoize = require('../../frame-memoize');

const memoized = frameMemoize(getTransformFromAncestor);

function getTransformFromAncestor(element, ancestor) {
  if (!element || element === ancestor) {
    return new Vector2d(0, 0);
  } else {
    return Vector2d.fromElementTransform(element)
      .add(memoized(element.offsetParent, ancestor));
  }
}

module.exports = memoized;
