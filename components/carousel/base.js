const getMostVisibleElement = require('../../utils/dom/position/get-most-visible-element');

class Carousel {
    constructor(container, slides) {
        this.container_ = container;
        this.slides_ = slides;
    }

    getActiveSlide() {
        return getMostVisibleElement(this.slides_, this.container_);
    }

    getSlides() {
        return this.slides_;
    }
}

module.exports = Carousel;
