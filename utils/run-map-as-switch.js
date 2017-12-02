const defaultSymbol = require('./default-symbol');

function runMapAsSwitch(map, key, ...args) {
  if (map.has(key)) {
    map.get(key)(...args);
  } else {
    map.get(defaultSymbol)(...args);
  }
}

module.exports = runMapAsSwitch;
