/**
 * Used for having a fixed element serve as a performance workaround for what
 * should otherwise be large amounts of inline content.
 * Created by angusm on 05/12/17.
 */

const getVisibleDimensions = require('./position/get-visible-dimensions');
const getVisibleDistanceFromAncestor = require('./position/get-visible-distance-from-ancestor');
const renderLoop = require('../render-loop');

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
      this.fixedEl_.style.position = 'fixed';
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
      const dimensions = getVisibleDimensions(this.maskEl_, null);
      const position = getVisibleDistanceFromAncestor(this.maskEl_, null);
      renderLoop.mutate(() => {
        position.positionElement(this.fixedEl_);
        dimensions.sizeElement(this.fixedEl_);
      });
      renderLoop.cleanup(() => this.render_());
    });
  }
}

module.exports = ElementMask;