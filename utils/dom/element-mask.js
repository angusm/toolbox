/**
 * Used for having a fixed element serve as a performance workaround for what
 * should otherwise be large amounts of inline content.
 * Created by angusm on 05/12/17.
 */
const Dimensions = require('../cached-vectors/dimensions');
const Dimensions2d = require('../math/geometry/dimensions-2d');
const Range = require('../range');
const Scroll = require('../cached-vectors/scroll');
const VisibleDimensions = require('../cached-vectors/visible-dimensions');
const VisibleDistance = require('../cached-vectors/visible-distance');
const renderLoop = require('../render-loop');

const windowDimensions = Dimensions.getSingleton();
const windowScroll = Scroll.getSingleton();

class ElementMask{
  constructor(fixedElement, maskElement, buffer = 0) {
    this.fixedEl_ = fixedElement;
    this.maskDimensions_ = Dimensions.getForElement(maskElement);
    this.maskVisibleDimensions_ = VisibleDimensions.getForElement(maskElement);
    this.maskPosition_ = VisibleDistance.getForElement(maskElement);
    this.stopped_ = false;
    this.buffer_ = buffer;
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
      this.renderFixed_();
      renderLoop.cleanup(() => this.render_());
    });
  }

  getWindowDimensionRanges_() {
    return windowDimensions.getDimensions()
      .asRanges()
      .map((range) => range.expand(this.buffer_));
  }

  renderFixed_() {
    const [widthRange, heightRange] = this.getWindowDimensionRanges_();

    const clippedPosition =
      this.maskPosition_.getDistance()
        .clamp(widthRange, heightRange)
        .add(windowScroll.getPosition());

    let bufferedDimensions = new Dimensions2d();
    if (this.maskVisibleDimensions_.getDimensions().getLength() != 0) {
      bufferedDimensions =
        this.maskVisibleDimensions_.getDimensions()
          .add(new Dimensions2d(this.buffer_, this.buffer_))
          .clamp(...this.maskDimensions_.getDimensions().asRanges());
    }

    renderLoop.mutate(() => {
      // Ensure hidden elements stay hidden
      if (bufferedDimensions.getArea()) {
        clippedPosition.positionElementByTranslation(this.fixedEl_);
        bufferedDimensions.sizeElement(this.fixedEl_);
        this.fixedEl_.style.visibility = 'initial';
      } else {
        this.fixedEl_.style.visibility = 'hidden';
      }
    });
  }
}

module.exports = ElementMask;