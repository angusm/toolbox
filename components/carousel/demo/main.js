const Carousel = require('../base');
const CarouselNav = require('../nav');
const CarouselTimer = require('../timer');
const Fade = require('../transitions/fade');
const Slide = require('../transitions/slide');
const Wipe = require('../transitions/wipe');

const selectorsAndTransitions = [
  ['.fade-demo', new Fade()],
  ['.slide-demo', new Slide()],
  // ['.wipe-demo', new Wipe()],
];

selectorsAndTransitions.forEach(
  ([selector, transition]) => {
    const demoContainer = document.querySelector(selector);
    const carouselElement = demoContainer.querySelector('.carousel');
    const slideElements = carouselElement.querySelectorAll('.carousel__slide');
    const carousel =
      new Carousel(carouselElement, slideElements, {transition: transition});

    const navigationElement = demoContainer.querySelector('.carousel__nav');
    const navigation = new CarouselNav(carousel, navigationElement);
    const timer = new CarouselTimer(carousel);
  });

