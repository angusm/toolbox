const defaultSymbol = require('./default-symbol');

function runMapAsSwitch(map, key, ...args) {
  if (map.has(key)) {
    return map.get(key)(...args);
  } else {
    return map.get(defaultSymbol)(...args);
  }
}

module.exports = runMapAsSwitch;
