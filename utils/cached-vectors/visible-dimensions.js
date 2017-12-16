const Dimensions = require('./dimensions');
const getVisibleDimensions = require('../dom/position/get-visible-dimensions');

class VisibleDimensions extends Dimensions {
  constructor(element, container = null) {
    super(element);
    this.container_ = container;
  }

  getFirstVectorValue_() {
    return getVisibleDimensions(this.element_, this.container_).width;
  }

  getSecondVectorValue_() {
    return getVisibleDimensions(this.element_, this.container_).height;
  }
}

module.exports = VisibleDimensions;
