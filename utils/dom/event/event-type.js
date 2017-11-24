const EventType = Object.freeze({
  CLICK: 'click',
  ENTER_KEYPRESS: Symbol('enter keypress'),
  INTERACT: Symbol('interact'),
  MOUSE_DOWN: 'mousedown',
  MOUSE_MOVE: 'mousemove',
  MOUSE_UP: 'mouseup',
  TOUCH: Symbol('touch'),
  TOUCH_START: 'touchstart',
  TOUCH_END: 'touchend',
  TOUCH_MOVE: 'touchmove',
  CURSOR_DOWN: Symbol('cursor down'),
  CURSOR_MOVE: Symbol('cursor move'),
  CURSOR_UP: Symbol('cursor up'),
});

module.exports = EventType;
