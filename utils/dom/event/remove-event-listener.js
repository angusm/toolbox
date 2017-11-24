const eventGroups = require('./event-groups');

function removeEventListener(element, eventType, callback) {
  if (callback instanceof Array) {
    callback.forEach((cb) => removeEventListener(element, eventType, callback));
  } else if (eventGroups.has(eventType)) {
    eventGroups.get(eventType).forEach((subEventType) => {
      removeEventListener(element, subEventType, callback);
    });
  } else {
    element.removeEventListener(eventType, callback);
  }
}

module.exports = removeEventListener;
