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
    while (
      endIndex < GESTURE_LIMIT - 1 && this.lastPositions_[endIndex].isPressed()
    ) {
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
    this.isPressed_ = false;
    this.init_();
  }

  init_() {
    addEventListner(
      window, EventType.CURSOR_DOWN, () => this.isPressed_ = true);
    addEventListner(
      window, EventType.CURSOR_UP, () => this.isPressed_ = false);
    addEventListner(
      window, EventType.CURSOR_MOVE, (event) => this.updatePosition_(event));
  }

  static getSingleton() {
    return singleton = singleton || new Cursor();
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

  updatePosition_(event) {
    if (event instanceof MouseEvent) {
      this.updatePositionFromEvent_(event);
    } else if (event instanceof TouchEvent) {
      this.updatePositionFromTouchEvent_(event);
    }
  }

  updatePositionFromTouchEvent_(touchEvent) {
    this.updatePosition_(touchEvent.touches[0]);
  }

  updatePositionFromEvent_(event) {
    this.clientPosition_ =
      this.clientPosition_.update(
        new CursorPosition(
          new Vector2d(event.clientX, event.clientY), this.isPressed_));

    this.pagePosition_ =
      this.pagePosition_.update(
        new CursorPosition(
          new Vector2d(event.pageX, event.pageY), this.isPressed_));
  }
}

module.exports = Cursor.getSingleton();
