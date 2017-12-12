const EventType = Object.freeze({
  CLICK: Symbol('click'),
  ENTER_KEYPRESS: Symbol('enter keypress'),
  INTERACT: Symbol('interact'),
  MOUSE_DOWN: Symbol('mousedown'),
  MOUSE_MOVE: Symbol('mousemove'),
  MOUSE_UP: Symbol('mouseup'),
  TOUCH: Symbol('touch'),
  TOUCH_START: Symbol('touchstart'),
  TOUCH_END: Symbol('touchend'),
  TOUCH_MOVE: Symbol('touchmove'),
  CURSOR_DOWN: Symbol('cursor down'),
  CURSOR_MOVE: Symbol('cursor move'),
  CURSOR_UP: Symbol('cursor up'),
});

module.exports = EventType;
