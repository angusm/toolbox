const EventType = require('./event-type');

const eventSequences = new Map();
eventSequences.set(
  EventType.TOUCH, [EventType.TOUCH_START, EventType.TOUCH_END]);

module.exports = eventSequences;
