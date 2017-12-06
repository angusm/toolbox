/**
 * Used for having a fixed element serve as a performance workaround for what
 * should otherwise be large amounts of inline content.
 * Created by angusm on 05/12/17.
 */
const Dimensions2d = require('../math/geometry/dimensions-2d');
const Range = require('../range');
const Scroll = require('../input/scroll');
const Vector2d = require('../math/geometry/vector-2d');
const getVisibleDimensions = require('./position/get-visible-dimensions');
const getVisibleDistanceFromAncestor = require('./position/get-visible-distance-from-ancestor');
const renderLoop = require('../render-loop');

const scroll = Scroll.getSingleton();

class ElementMask{
  constructor(fixedElement, maskElement) {
    this.fixedEl_ = fixedElement;
    this.maskEl_ = maskElement;
    this.stopped_ = false;
    this.init_();
  }

  init_() {
    this.render_();
    this.initFixedElement_();
  }

  initFixedElement_() {
    renderLoop.mutate(() => {
      this.fixedEl_.style.position = 'absolute';
      this.fixedEl_.style.left = 0;
      this.fixedEl_.style.top = 0;
      this.fixedEl_.style.right = 'auto';
      this.fixedEl_.style.bottom = 'auto';
    });
  }

  stop() {
    this.stopped_ = true;
  }

  render_() {
    if (this.stopped_) {
      return;
    }
    renderLoop.measure(() => {
      const position = getVisibleDistanceFromAncestor(this.maskEl_);
      if (position.y >= 0) {
        this.renderAbsolute_();
      } else {
        this.renderFixed_();
      }
      renderLoop.cleanup(() => this.render_());
    });
  }

  renderAbsolute_() {
    const dimensions = getVisibleDimensions(this.maskEl_);
    const position =
      getVisibleDistanceFromAncestor(this.maskEl_).add(scroll.getPosition());
    renderLoop.mutate(() => {
      this.fixedEl_.style.position = 'absolute';
      position.positionElement(this.fixedEl_);
      dimensions.sizeElement(this.fixedEl_);
    });
  }

  renderFixed_() {
    const dimensions = getVisibleDimensions(this.maskEl_);
    const position = getVisibleDistanceFromAncestor(this.maskEl_);
    const clippedPosition =
      new Vector2d(
        new Range(0, window.innerWidth).clamp(position.x),
        new Range(0, window.innerHeight).clamp(position.y));
    renderLoop.mutate(() => {
      this.fixedEl_.style.position = 'fixed';
      clippedPosition.positionElement(this.fixedEl_);
      dimensions.sizeElement(this.fixedEl_);
    });
  }
}

module.exports = ElementMask;