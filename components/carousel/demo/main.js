const Carousel = require('../base');
const CarouselNav = require('../nav');

const carouselElement = document.querySelector('.carousel');
const slideElements = document.querySelectorAll('.carousel__slide');
const carousel = new Carousel(carouselElement, slideElements);

const navigationElement = document.querySelector('.carousel__nav');
const navigation = new CarouselNav(carousel, navigationElement);

