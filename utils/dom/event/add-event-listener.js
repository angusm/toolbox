const eventGroups = require('./event-groups');
const eventSequences = require('./event-sequences');
const removeEventListener = require('./remove-event-listener');
const specialHandlers = require('./special-handlers');

function addEventListener(element, eventType, callback) {
  if (eventGroups.has(eventType)) {
    return eventGroups.get(eventType).map((subEventType) => {
      return addEventListener(element, subEventType, callback);
    });
  } else if (eventSequences.has(eventType)) {
    return addSequenceListener_(
      element, eventSequences.get(eventType), callback);
  } else if (specialHandlers.has(eventType)) {
    return specialHandlers.get(eventType)(element, callback);
  } else {
    element.addEventListener(eventType, callback);
    return [eventType, callback];
  }
}

function addSequenceListener_(element, eventTypes, terminalCallback) {
  let callback;
  const [firstEvent, ...remainingEvents] = eventTypes;
  if (remainingEvents.length >= 1) {
    callback = () => {
      const nextCallback =
        addSequenceListener(element, remainingEvents, terminalCallback);
      addEventListener(
        document.body, remainingEvents[0], () => {
          removeEventListener(element, remainingEvents[0], nextCallback);
        });
    };
    return addEventListener(element, firstEvent, callback);
  } else {
    return addEventListener(element, firstEvent, terminalCallback);
  }
}

module.exports = addEventListener;
