const Vector2d = require('../../math/geometry/vector-2d');
const frameMemoize = require('../../frame-memoize');

const memoized = frameMemoize(getVisibleDistanceFromAncestor);

function getVisibleDistanceFromAncestor(
  element, ancestor
) {
  if (!element || element === ancestor) {
    return Vector2d.fromElementScroll(element).inverse();
  } else {
    return Vector2d.add(
      Vector2d.fromElementOffset(element),
      Vector2d.fromElementTransform(element),
      Vector2d.fromElementScroll(element),
      memoized(element.offsetParent, ancestor));
  }
}

module.exports = memoized;
