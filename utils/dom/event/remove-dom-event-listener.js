const eventGroups = require('./event-groups');

function removeDomEventListener(element, eventType, callback) {
  if (callback instanceof Array) {
    callback.forEach((cb) => removeDomEventListener(element, eventType, callback));
  } else if (eventGroups.has(eventType)) {
    eventGroups.get(eventType)
      .forEach(
        (subEventType) =>
          removeDomEventListener(element, subEventType, callback));
  } else {
    element.removeEventListener(eventType, callback);
  }
}

module.exports = removeDomEventListener;
