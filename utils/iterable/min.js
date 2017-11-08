const max = require('./max');

function min(iterable, scoreFn) {
    return max(iterable, (value) => -scoreFn(value));
}

module.exports = min;
