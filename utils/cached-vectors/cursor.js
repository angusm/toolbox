const EventType = require('../dom/event/event-type');
const Vector2d = require('../math/geometry/vector-2d');
const addEventListner = require('../dom/event/add-dom-event-listener');
const filterUntilFalse = require('../iterable/filter-until-false');
const filterUntilFirst = require('../iterable/filter-until-first');
const frame = require('../frame');
const renderLoop = require('../render-loop');

let singleton;

const ZERO_VECTOR = new Vector2d();
const GESTURE_LIMIT = 30;
const POSITION_LIMIT = GESTURE_LIMIT;

class CursorPosition {
  constructor(position, pressed) {
    this.position_ = position;
    this.pressed_ = pressed;
    this.frame_ = frame.getFrame();
  }

  static fromXY(x, y, pressed) {
    return new this(new Vector2d(x, y), pressed);
  }

  getFrame() {
    return this.frame_;
  }

  isForFrame(...frames) {
    return frames.indexOf(this.getFrame()) !== -1;
  }

  isPressed() {
    return this.pressed_;
  }

  getPosition() {
    return this.position_;
  }
}

const ZERO_POSITION = new CursorPosition(ZERO_VECTOR, false);
class CursorData {
  constructor(currentPosition = ZERO_POSITION, ...pastPositions) {
    this.positions_ = [currentPosition, ...pastPositions];
  }

  update(position) {
    return new CursorData(
      position, ...this.positions_.slice(0, POSITION_LIMIT - 1));
  }

  getLatestPosition_() {
    return this.positions_[0];
  }

  getPosition() {
    return this.getLatestPosition_().getPosition();
  }

  getFrameDelta() {
    return this.getFrameDelta_(false);
  }

  getPressedFrameDelta() {
    return this.getFrameDelta_(true);
  }

  getFrameDelta_(usePressedPositionsOnly) {
    const positions = this.getPositionsForFrameDelta_(usePressedPositionsOnly);
    return positions.length === 0 ?
      ZERO_VECTOR :
      Vector2d.sumDeltas(
        ...positions.map((position) => position.getPosition()));
  }

  getPositionsForFrameDelta_(usePressedPositionsOnly) {
    const currentFrame = frame.getFrame();

    // If the latest frame is not the current one then we have no delta to
    // report.
    if (!this.getLatestPosition_().isForFrame(currentFrame)) {
      return [];
    }

    const isPreviousFrame = (position) => !position.isForFrame(currentFrame);
    const positionsToConsider =
      filterUntilFirst(this.positions_, isPreviousFrame);

    if (usePressedPositionsOnly) {
      const isPressed = (position) => position.isPressed();
      return filterUntilFalse(positionsToConsider, isPressed);
    } else {
      return positionsToConsider;
    }

  }

  getGestureDelta() {
    return CursorData.getGestureDeltaFromPositions_(...this.positions_);
  }

  getPressedGestureDelta() {
    return CursorData.getGestureDeltaFromPositions_(
      ...this.getPressedGesturePositions_());
  }

  getPressedGesturePositions_() {
    const conditionFn =
      (position, index) => index < GESTURE_LIMIT - 1 && position.isPressed();

    return filterUntilFalse(this.positions_, conditionFn);
  }

  static getGestureDeltaFromPositions_(...positions) {
    const deltas = Vector2d.getDeltas(
      ...positions.map((position) => position.getPosition()));
    const scaledDeltas = deltas.map(
      (delta, index) => delta.scale((deltas.length - index) / deltas.length));
    return Vector2d.add(...scaledDeltas);
  }
}

class Cursor {
  constructor() {
    this.clientPosition_ = new CursorData();
    this.pagePosition_ = new CursorData();
    this.screenPosition_ = new CursorData();
    this.isPressed_ = false;
    this.frame_ = 0;
    this.init_();
  }

  init_() {
    addEventListner(
      window, EventType.CURSOR_DOWN, (event) => this.updatePress_(event, true));
    addEventListner(
      window, EventType.CURSOR_UP, (event) => this.updatePress_(event, false));
    addEventListner(
      window, EventType.CURSOR_MOVE, (event) => this.updatePosition_(event));
  }

  static getSingleton() {
    return singleton = singleton || new this();
  }

  isPressed() {
    return this.isPressed_;
  }

  getClient() {
    return this.clientPosition_;
  }

  getPage() {
    return this.pagePosition_;
  }

  getScreen() {
    return this.screenPosition_;
  }

  updatePress_(event, isPressed) {
    this.isPressed_ = isPressed;
    this.updatePosition_(event);
  }

  updatePosition_(event) {
    if (event instanceof MouseEvent) {
      this.updatePositionFromEvent_(event);
    } else if (event instanceof TouchEvent) {
      this.updatePositionFromTouchEvent_(event);
    }
  }

  updatePositionFromTouchEvent_(touchEvent) {
    if (touchEvent.touches.length > 0) {
      this.updatePositionFromEvent_(touchEvent.touches[0]);
    } else {
      this.endTouch_();
    }
  }

  endTouch_() {
    renderLoop.premeasure(() => {
      this.pagePosition_ = this.duplicatePosition_(this.pagePosition_);
      this.clientPosition_ = this.duplicatePosition_(this.clientPosition_);
      this.screenPosition_ = this.duplicatePosition_(this.screenPosition_);
    });
  }

  updatePositionFromEvent_(event) {
    renderLoop.premeasure(() => {
      this.pagePosition_ =
        this.updatePositionWithXY_(
          this.pagePosition_, event.pageX, event.pageY);

      this.clientPosition_ =
        this.updatePositionWithXY_(
          this.clientPosition_, event.clientX, event.clientY);

      this.screenPosition_ =
        this.updatePositionWithXY_(
          this.screenPosition_, event.screenX, event.screenY);
    });
  }

  duplicatePosition_(position) {
    return position.update(
      new CursorPosition(position.getPosition(), this.isPressed()));
  }

  updatePositionWithXY_(position, xValue, yValue) {
    return position.update(
      CursorPosition.fromXY(xValue, yValue, this.isPressed()));
  }
}

module.exports = Cursor.getSingleton();
