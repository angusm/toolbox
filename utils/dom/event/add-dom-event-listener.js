const eventGroups = require('./event-groups');
const eventSequences = require('./event-sequences');
const removeEventListener = require('./remove-dom-event-listener');
const specialHandlers = require('./special-handlers');
const uids = require('./uids');

function addDomEventListener(dispatcher, eventType, callback) {
  if (eventGroups.has(eventType)) {
    return eventGroups.get(eventType).map((subEventType) => {
      return addDomEventListener(dispatcher, subEventType, callback);
    });
  } else if (eventSequences.has(eventType)) {
    return addSequenceListener_(
      dispatcher, eventSequences.get(eventType), callback);
  } else if (specialHandlers.has(eventType)) {
    return specialHandlers.get(eventType)(dispatcher, callback);
  } else {
    const eventString = uids.get(eventType);
    dispatcher.addEventListener(eventString, callback);
    return [eventType, callback];
  }
}

function addSequenceListener_(dispatcher, eventTypes, terminalCallback) {
  let callback;
  const [firstEvent, ...remainingEvents] = eventTypes;
  if (remainingEvents.length >= 1) {
    callback = () => {
      const nextCallback =
        addSequenceListener_(dispatcher, remainingEvents, terminalCallback);
      addDomEventListener(
        document.body,
        remainingEvents[0],
        () => removeEventListener(
          dispatcher, remainingEvents[0], nextCallback));
    };
    return addDomEventListener(dispatcher, firstEvent, callback);
  } else {
    return addDomEventListener(dispatcher, firstEvent, terminalCallback);
  }
}

module.exports = addDomEventListener;
