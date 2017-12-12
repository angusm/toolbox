const builtIns = require('./built-ins');
const getSymbolString = require('../../symbol/get-symbol-string');

function getEventString(eventType) {
  return builtIns.has(eventType) ? eventType : getSymbolString(eventType);
}

module.exports = getEventString;