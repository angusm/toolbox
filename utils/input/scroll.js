const DynamicDefaultMap = require('../map/dynamic-default');
const Vector2d = require('../math/geometry/vector-2d');
const renderLoop = require('../render-loop');

let singleton;

const instanceByElement =
  new DynamicDefaultMap.usingFunction((element) => new Scroll(element));

const ZERO_VECTOR = new Vector2d();
const POSITION_LIMIT = 2;

class Scroll {
  constructor(element = null) {
    if (instanceByElement.has(element)) {
      console.error('Please use getForElement instead of new.');
    }
    this.element_ = element;
    this.positions_ = [ZERO_VECTOR];
    this.init_();
  }

  init_() {
    this.render_();
  }

  getPosition() {
    return this.positions_.slice(-1)[0];
  }

  getScrollX_() {
    if (this.element_) {
      return this.element_.scrollLeft;
    } else {
      return window.pageXOffset || document.body.scrollLeft;
    }
  }

  getScrollY_() {
    if (this.element_) {
      return this.element_.scrollTop;
    } else {
      return window.pageYOffset || document.body.scrollTop;
    }
  }

  render_() {
    renderLoop.measure(() => {
      this.positions_ =
        this.positions_.slice(-(POSITION_LIMIT - 1))
          .concat([new Vector2d(this.getScrollX_(), this.getScrollY_())]);
      renderLoop.cleanup(() => this.render_());
    });
  }

  getDelta() {
    return Vector2d.subtract(...this.positions_.slice(-2));
  }

  static getForElement(element) {
    return instanceByElement.get(element);
  }

  static getSingleton() {
    return singleton = singleton || new Scroll();
  }
}

module.exports = Scroll;
