const FadeTransition = require('./transitions/fade');
const getMostVisibleElement = require('../../utils/dom/position/get-most-visible-element');
const getVisibleArea = require('../../utils/dom/position/get-visible-area');
const renderLoop = require('../../utils/render-loop');

const defaultTransition = new FadeTransition();

class Carousel {
    constructor(
        container,
        slides,
        {
            transition = defaultTransition,
            factorInOpacity = true,
        } = {}
    ) {
        this.container_ = container;
        this.factorInOpacity_ = factorInOpacity;
        this.slides_ = slides;
        this.transition_ = transition;
        this.transitionTargets_ = [];

        this.init_();
    }

    transitionToSlide(targetSlide) {
        this.transitionTargets_ = [...this.transitionTargets_, targetSlide];
    }

    init_() {
        console.log('INIT');
        this.render_();
    }

    render_() {
        console.log('RENDER');
        renderLoop.measure(() => {
            this.removeCurrentlyActiveTransitionTargets_();
            if (this.getNextTransitionTarget_()) {
                this.transition_.transition(this.getNextTransitionTarget_(), this);
            }
            renderLoop.mutate(() => this.render_());
        });
    }

    getActiveSlide() {
        return getMostVisibleElement(
            this.slides_, this.container_, this.factorInOpacity_);
    }

    isSlideFullyVisible_(slide) {
        return getVisibleArea(slide, this.container_, this.factorInOpacity_);
    }

    getSlides() {
        return [...this.slides_];
    }

    getNextTransitionTarget_() {
        return this.transitionTargets_[0];
    }

    removeCurrentlyActiveTransitionTargets_() {
        while (
            this.getNextTransitionTarget_() &&
            this.isSlideFullyVisible_(this.getNextTransitionTarget_())
        ) {
            this.transitionTargets_ = this.transitionTargets_.slice(1);
        }
    }


}

module.exports = Carousel;
