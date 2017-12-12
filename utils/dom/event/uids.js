const DynamicDefaultMap = require('../../map/dynamic-default');
const builtIns = require('./built-ins');
const getEventString = require('./get-event-string');

let uid_ = 0;
const uids =
  DynamicDefaultMap.usingFunction(
    (eventType) => {
      const eventString = getEventString(eventType);
      if (builtIns.has(eventString)) {
        return eventString;
      } else {
        return `CustomEvent_${uid_++}`;
      }
    });

module.exports = uids;