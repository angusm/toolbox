const EventType = require('./event-type');

const eventGroups = new Map();
eventGroups.set(
  EventType.INTERACT,
  [EventType.CLICK, EventType.ENTER_KEYPRESS, EventType.TOUCH]);
eventGroups.set(
  EventType.CURSOR_DOWN,
  [EventType.MOUSE_DOWN, EventType.TOUCH_START]);
eventGroups.set(
  EventType.CURSOR_MOVE,
  [EventType.MOUSE_MOVE, EventType.TOUCH_MOVE]);
eventGroups.set(
  EventType.CURSOR_UP,
  [EventType.MOUSE_UP, EventType.TOUCH_END]);

module.exports = eventGroups;
