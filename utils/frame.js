const renderLoop = require('./render-loop');

class Frame {
  constructor() {
    this.currentFrame_ = 0;
    this.render_();
  }

  render_() {
    renderLoop.premeasure(() => {
      this.currentFrame_++;
      renderLoop.cleanup(() => this.render_());
    });
  }

  getFrame() {
    return this.currentFrame_;
  }

  static getSingleton() {
    return this.singleton_ || (this.singleton_ = new this());
  }
}

module.exports = Frame.getSingleton();