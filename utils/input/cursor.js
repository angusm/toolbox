const EventType = require('../dom/event/event-type');
const Vector2d = require('../math/geometry/vector-2d');
const addEventListner = require('../dom/event/add-event-listener');
const renderLoop = require('../render-loop');

let singleton;

const ZERO_VECTOR = new Vector2d();
const GESTURE_LIMIT = 30;
const POSITION_LIMIT = GESTURE_LIMIT;

class CursorPosition {
  constructor(position, pressed) {
    this.position_ = position;
    this.pressed_ = pressed;
  }

  static fromXY(x, y, pressed) {
    return new this(new Vector2d(x, y), pressed);
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
    this.currentPosition_ = currentPosition;
    this.lastPositions_ = pastPositions;

    this.init_();
  }

  init_() {
    renderLoop.premeasure(() => this.render_());
  }

  render_() {
    renderLoop.premeasure(() => {
      renderLoop.cleanup(() => {
        this.lastPositions_ =
          [this.currentPosition_].concat(
            this.lastPositions_.slice(0, POSITION_LIMIT - 1));
        this.render_();
      });
    });
  }

  update(position) {
    return new CursorData(
      position, this.currentPosition_, ...this.lastPositions_);
  }

  getPosition() {
    return this.currentPosition_.getPosition();
  }

  getFrameDelta() {
    return this.lastPositions_.length ?
      this.getPosition().subtract(this.lastPositions_[0].getPosition()) :
      ZERO_VECTOR;
  }

  getGestureDelta() {
    return CursorData.getGestureDeltaFromPositions_(
      this.currentPosition_,
      ...this.lastPositions_.slice(0, GESTURE_LIMIT - 1));
  }

  getPressedGestureDelta() {
    return CursorData.getGestureDeltaFromPositions_(
      ...this.getPressedGesturePositions_());
  }

  getPressedGesturePositions_() {
    if (!this.currentPosition_.isPressed()) {
      return [];
    }
    let endIndex = 0;
    while (endIndex < GESTURE_LIMIT - 1 &&
    this.lastPositions_[endIndex].isPressed()) {
      endIndex++;
    }

    return [this.currentPosition_].concat(
      this.lastPositions_.slice(0, endIndex));
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
    }
  }

  static getPositionPropertyMappings_() {
    return POSITION_PROPERTY_MAPPINGS;
  }

  updatePositionFromEvent_(event) {
    this.pagePosition_ =
      this.updatePositionWithXY_(this.pagePosition_, event.pageX, event.pageY);

    this.clientPosition_ =
      this.updatePositionWithXY_(
        this.clientPosition_, event.clientX, event.clientY);

    this.screenPosition_ =
      this.updatePositionWithXY_(
        this.screenPosition_, event.screenX, event.screenY);
  }

  updatePositionWithXY_(position, xValue, yValue) {
    return position.update(
      CursorPosition.fromXY(xValue, yValue, this.isPressed()));
  }

}

window.cc = Cursor.getSingleton();

module.exports = Cursor.getSingleton();
