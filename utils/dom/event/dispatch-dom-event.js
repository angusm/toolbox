const builtIns = require('./built-ins');

function dispatchDomEvent(dispatcher, eventType, data) {
  const event = document.createEvent('Event');

  // Define that the event name is 'build'.
  event.initEvent(eventType, true, true);

  // target can be any Element or other EventTarget.
  dispatcher.dispatchEvent(event);
}

module.exports = dispatchDomEvent();