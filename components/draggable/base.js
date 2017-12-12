const Drag = require('./events/drag');
const DragEnd = require('./events/drag-end');
const DragStart = require('./events/drag-start');
const EventType = require('../../utils/dom/event/event-type');
const Vector2d = require('../../utils/math/geometry/vector-2d');
const addDomEventListener = require('../../utils/dom/event/add-dom-event-listener');
const cursor = require('../../utils/cached-vectors/cursor');
const eventHandler = require('../../utils/event/event-handler');
const renderLoop = require('../../utils/render-loop');
const translate2d = require('../../utils/dom/position/translate-2d');

class Draggable {
  constructor(element, {enableX = true, enableY = true} = {}) {
    this.xEnabled_ = enableX;
    this.yEnabled_ = enableY;
    this.element_ = element;
    this.interacting_ = false;
    this.init_();
  }

  init_() {
    this.initInteraction_();
    this.render_();
  }

  initInteraction_() {
    addDomEventListener(
      this.element_, EventType.CURSOR_DOWN, () => this.startInteraction_());
    addDomEventListener(
      window, EventType.CURSOR_UP, () => this.endInteraction_());
  }

  startInteraction_() {
    this.interacting_ = true;
    eventHandler.dispatchEvent(new DragStart(this));
  }

  endInteraction_() {
    this.interacting_ = false;
    eventHandler.dispatchEvent(new DragEnd(this));
  }

  isInteracting_() {
    return this.interacting_;
  }

  render_() {
    renderLoop.measure(() => {
      this.renderDrag_();
      renderLoop.cleanup(() => this.render_());
    });
  }

  renderDrag_() {
    if (!this.isInteracting_()) {
      return;
    }
    const delta = this.getDelta_();
    if (!delta.getLength()) {
      return;
    }
    eventHandler.dispatchEvent(new Drag(this, this.element_, delta));
    translate2d(this.element_, delta);
  }

  getDelta_() {
    let delta = cursor.getClient().getPressedFrameDelta();
    if (!this.xEnabled_) {
      delta = new Vector2d(0, delta.y);
    }
    if (!this.yEnabled_) {
      delta = new Vector2d(delta.x, 0);
    }
    return delta;
  }
}

module.exports = Draggable;
