/**
 * Used for having a fixed element serve as a performance workaround for what
 * should otherwise be large amounts of inline content.
 * Created by angusm on 05/12/17.
 */
const Dimensions = require('../cached-vectors/dimensions');
const Range = require('../range');
const Scroll = require('../cached-vectors/scroll');
const VisibleDimensions = require('../cached-vectors/visible-dimensions');
const VisibleDistance = require('../cached-vectors/visible-distance');
const renderLoop = require('../render-loop');

const windowDimensions = Dimensions.getSingleton();
const windowScroll = Scroll.getSingleton();

class ElementMask{
  constructor(fixedElement, maskElement) {
    this.fixedEl_ = fixedElement;
    this.maskDimensions_ = VisibleDimensions.getForElement(maskElement);
    this.maskPosition_ = VisibleDistance.getForElement(maskElement);
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
      if (this.maskPosition_.getDistance().y >= 0) {
        this.renderAbsolute_();
      } else {
        this.renderFixed_();
      }
      renderLoop.cleanup(() => this.render_());
    });
  }

  renderAbsolute_() {
    const position =
      this.maskPosition_.getDistance().add(windowScroll.getPosition());
    renderLoop.mutate(() => {
      position.positionElementByTranslation(this.fixedEl_);
      this.maskDimensions_.getDimensions().sizeElement(this.fixedEl_);
    });
  }

  renderFixed_() {
    const widthRange = new Range(0, windowDimensions.getDimensions().width);
    const heightRange = new Range(0, windowDimensions.getDimensions().height);

    const clippedPosition =
      this.maskPosition_.getDistance()
        .clamp(widthRange, heightRange)
        .add(windowScroll.getPosition());

    renderLoop.mutate(() => {
      clippedPosition.positionElementByTranslation(this.fixedEl_);
      this.maskDimensions_.getDimensions().sizeElement(this.fixedEl_);
    });
  }
}

module.exports = ElementMask;