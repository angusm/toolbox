const Scroll = require('../../cached-vectors/scroll');
const Vector2d = require('../../math/geometry/vector-2d');
const frameMemoize = require('../../frame-memoize');
const isTableDisplayed = require('../style/is-table-displayed');

const scroll = Scroll.getSingleton();
const memoized = frameMemoize(getVisibleDistanceFromAncestor);
const memoized_ = frameMemoize(getVisibleDistanceFromAncestor_);
const ZERO_VECTOR = new Vector2d();

function getVisibleDistanceFromAncestor_(element, ancestor) {
  if (!element || element === document.body) {
    return ZERO_VECTOR;
  } else if (element === ancestor) {
    return Vector2d.fromElementScroll(element).invert();
  } else if (window['enableToolboxExperiments']) {
    console.log('RUNNING EXPERIMENT');

    const offsetTop =
      element.offsetParent && isTableDisplayed(element.offsetParent) ?
        element.offsetTop - element.offsetParent.offsetTop : element.offsetTop;
    return Vector2d.add(
      offsetTop,
      Vector2d.fromElementTransform(element),
      Vector2d.fromElementScroll(element).invert(),
      memoized_(element.offsetParent, ancestor));

  } else {
    return Vector2d.add(
      Vector2d.fromElementOffset(element),
      Vector2d.fromElementTransform(element),
      Vector2d.fromElementScroll(element).invert(),
      memoized_(element.offsetParent, ancestor));
  }
}

function getVisibleDistanceFromAncestor(element, ancestor = null) {
  return Vector2d.add(
    ancestor ? ZERO_VECTOR : scroll.getPosition().invert(),
    Vector2d.fromElementScroll(element),
    memoized_(element, ancestor));
}

module.exports = memoized;
