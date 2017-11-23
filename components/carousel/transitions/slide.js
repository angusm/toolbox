const Transition = require('./base');
const Vector2d = require('../../../utils/math/geometry/vector-2d');
const getSign = require('../../../utils/math/get-sign');
const getVisibleDistanceBetweenElements = require('../../../utils/dom/position/get-visible-distance-between-elements');
const renderLoop = require('../../../utils/render-loop');
const sum = require('../../../utils/math/sum');
const translate2d = require('../../../utils/dom/position/translate-2d');

class Slide extends Transition {
  constructor(step = 50) {
    super();
    this.step_ = step;
  }

  init(target, carousel) {
    renderLoop.measure(() => {
      const translation =
        Slide.getTransitionTranslation_(target, carousel, Number.MAX_VALUE);
      Slide.transition_(target, carousel, translation);
    });
  }

  static getTransitionTranslation_(target, carousel, step) {
    const xDistance =
      -getVisibleDistanceBetweenElements(target, carousel.getContainer()).x;
    const translateX = Math.min(step, Math.abs(xDistance)) * getSign(xDistance);
    return new Vector2d(translateX, 0);
  }

  transition(target, carousel) {
    const translation =
      Slide.getTransitionTranslation_(target, carousel, this.step_);
    Slide.transition_(carousel.getActiveSlide(), carousel, translation);
  }

  static transition_(activeSlide, carousel, translation) {
    Slide.transitionActiveSlide_(activeSlide, translation);
    this.getHalfBeforeActiveSlide_(carousel, activeSlide).reduce(
      (previousSlides, slide) => {
        Slide.transitionBeforeSlide_(
          slide, activeSlide, previousSlides, translation);
        return [...previousSlides, slide];
      }, []);

    this.getHalfAfterActiveSlide_(carousel, activeSlide).reduce(
      (previousSlides, slide) => {
        Slide.transitionAfterSlide_(
          slide, activeSlide, previousSlides, translation);
        return [...previousSlides, slide];
      }, []);
  }

  static transitionActiveSlide_(slide, translation) {
    translate2d(slide, translation);
  }

  static transitionBeforeSlide_(
    slideToTransition,
    activeSlide,
    previousSlides,
    translation
  ) {
    renderLoop.measure(() => {
      const currentOffset =
        getVisibleDistanceBetweenElements(slideToTransition, activeSlide);
      const desiredDistance =
        -Slide.sumSlideWidths(slideToTransition, ...previousSlides);
      const desiredOffset = new Vector2d(desiredDistance, 0);
      translate2d(
        slideToTransition,
        desiredOffset.subtract(currentOffset).add(translation));
    });
  }

  static transitionAfterSlide_(
    slideToTransition,
    activeSlide,
    previousSlides,
    translation
  ) {
    renderLoop.measure(() => {
      const currentOffset =
        getVisibleDistanceBetweenElements(slideToTransition, activeSlide);
      const desiredDistance =
        Slide.sumSlideWidths(activeSlide, ...previousSlides);
      const desiredOffset = new Vector2d(desiredDistance, 0);
      translate2d(
        slideToTransition,
        desiredOffset.subtract(currentOffset).add(translation));
    });
  }

  static sumSlideWidths(...slides) {
    return sum(...slides.map((slide) => slide.offsetWidth));
  }

  static getHalfBeforeActiveSlide_(carousel, activeSlide) {
    return Slide.getHalfOfCarouselFromActive_(carousel, activeSlide, -1);
  }

  static getHalfAfterActiveSlide_(carousel, activeSlide) {
    return Slide.getHalfOfCarouselFromActive_(carousel, activeSlide, 1);
  }

  static getHalfOfCarouselFromActive_(carousel, activeSlide, direction) {
    const slides = carousel.getSlides();
    const length = Slide.getLengthOfHalfOfCarousel_(carousel, direction);
    let indexToAdd = carousel.getSlideIndex(activeSlide);
    const result = [];
    while (result.length < length) {
      indexToAdd = (indexToAdd + direction + slides.length) % slides.length;
      result.push(slides[indexToAdd]);
    }
    return result;
  }

  static getLengthOfHalfOfCarousel_(carousel, direction) {
    // Adding half of the direction ensures that if there is an uneven number
    // to split along the carousel, it will always be on the right, the typical
    // direction of travel.
    return Math.floor((carousel.getSlides().length + direction / 2) / 2);
  }

}

module.exports = Slide;
