const EventType = require('../../../utils/dom/event/event-type');
const Transition = require('./base');
const Vector2d = require('../../../utils/math/geometry/vector-2d');
const addEventListener = require('../../../utils/dom/event/add-event-listener');
const cursor = require('../../../utils/cached-vectors/cursor');
const getSign = require('../../../utils/math/get-sign');
const getVisibleDistanceBetweenElements = require('../../../utils/dom/position/get-visible-distance-between-elements');
const max = require('../../../utils/iterable/max');
const min = require('../../../utils/iterable/min');
const renderLoop = require('../../../utils/render-loop');
const sum = require('../../../utils/math/sum');
const translate2d = require('../../../utils/dom/position/translate-2d');

const WIPE_INTERACTION = Symbol('Wipe Interaction');
const GESTURE_MOVEMENT_THRESHOLD = 20;

class Wipe extends Transition {
  constructor(step = 50) {
    super();
    this.step_ = step;
  }

  init(target, carousel) {
    Wipe.initPosition_(target, carousel);
    Wipe.initInteraction_(carousel);
    renderLoop.mutate(() => Wipe.render_(carousel));
  }

  static render_(carousel) {
    renderLoop.measure(() => {
      if (carousel.isBeingInteractedWith(WIPE_INTERACTION)) {
        const deltaX = cursor.getClient().getPressedFrameDelta().x;
        if (deltaX) {
          const translation = new Vector2d(deltaX, 0);
          Wipe.transition_(carousel.getActiveWipe(), carousel, translation);
        }
      }
      renderLoop.mutate(() => Wipe.render_(carousel));
    });
  }

  static initInteraction_(carousel) {
    addEventListener(
      carousel.getContainer(),
      EventType.CURSOR_DOWN,
      () => carousel.startInteraction(WIPE_INTERACTION));
    addEventListener(
      window,
      EventType.CURSOR_UP,
      () => Wipe.finishWipeInteraction(carousel));
  }

  static finishWipeInteraction(carousel) {
    carousel.endInteraction(WIPE_INTERACTION);
    const gestureDistance = cursor.getClient().getPressedGestureDelta().x;
    if (Math.abs(gestureDistance) < GESTURE_MOVEMENT_THRESHOLD) {
      carousel.transitionToWipe(carousel.getActiveWipe());
    } else {
      const filterFn = gestureDistance > 0 ? min : max;
      const wipeDistance =
        (wipe) =>
          getVisibleDistanceBetweenElements(wipe, carousel.getContainer()).x;
      carousel.transitionToWipe(
        filterFn(carousel.getVisibleWipes(), wipeDistance));
    }
  }

  static initPosition_(target, carousel) {
    renderLoop.measure(() => {
      const translation =
        Wipe.getTransitionTranslation_(target, carousel, Number.MAX_VALUE);
      Wipe.transition_(target, carousel, translation);
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
      Wipe.getTransitionTranslation_(target, carousel, this.step_);
    Wipe.transition_(carousel.getActiveWipe(), carousel, translation);
  }

  static transition_(activeWipe, carousel, translation) {
    Wipe.transitionActiveWipe_(activeWipe, translation);
    this.getHalfBeforeActiveWipe_(carousel, activeWipe).reduce(
      (previousWipes, wipe) => {
        Wipe.transitionBeforeWipe_(
          wipe, activeWipe, previousWipes, translation);
        return [...previousWipes, wipe];
      }, []);

    this.getHalfAfterActiveWipe_(carousel, activeWipe).reduce(
      (previousWipes, wipe) => {
        Wipe.transitionAfterWipe_(
          wipe, activeWipe, previousWipes, translation);
        return [...previousWipes, wipe];
      }, []);
  }

  static transitionActiveWipe_(wipe, translation) {
    translate2d(wipe, translation);
  }

  static transitionBeforeWipe_(
    wipeToTransition,
    activeWipe,
    previousWipes,
    translation
  ) {
    const currentOffset =
      getVisibleDistanceBetweenElements(wipeToTransition, activeWipe);
    const desiredDistance =
      -Wipe.sumWipeWidths(wipeToTransition, ...previousWipes);
    const desiredOffset = new Vector2d(desiredDistance, 0);
    translate2d(
      wipeToTransition,
      desiredOffset.subtract(currentOffset).add(translation));
  }

  static transitionAfterWipe_(
    wipeToTransition,
    activeWipe,
    previousWipes,
    translation
  ) {
    const currentOffset =
      getVisibleDistanceBetweenElements(wipeToTransition, activeWipe);
    const desiredDistance =
      Wipe.sumWipeWidths(activeWipe, ...previousWipes);
    const desiredOffset = new Vector2d(desiredDistance, 0);
    translate2d(
      wipeToTransition,
      desiredOffset.subtract(currentOffset).add(translation));
  }

  static sumWipeWidths(...wipes) {
    return sum(...wipes.map((wipe) => wipe.offsetWidth));
  }

  static getHalfBeforeActiveWipe_(carousel, activeWipe) {
    return Wipe.getHalfOfCarouselFromActive_(carousel, activeWipe, -1);
  }

  static getHalfAfterActiveWipe_(carousel, activeWipe) {
    return Wipe.getHalfOfCarouselFromActive_(carousel, activeWipe, 1);
  }

  static getHalfOfCarouselFromActive_(carousel, activeWipe, direction) {
    const wipes = carousel.getWipes();
    const length = Wipe.getLengthOfHalfOfCarousel_(carousel, direction);
    let indexToAdd = carousel.getWipeIndex(activeWipe);
    const result = [];
    while (result.length < length) {
      indexToAdd = (indexToAdd + direction + wipes.length) % wipes.length;
      result.push(wipes[indexToAdd]);
    }
    return result;
  }

  static getLengthOfHalfOfCarousel_(carousel, direction) {
    // Adding half of the direction ensures that if there is an uneven number
    // to split along the carousel, it will always be on the right, the typical
    // direction of travel.
    return Math.floor((carousel.getWipes().length + direction / 2) / 2);
  }
}

module.exports = Wipe;
