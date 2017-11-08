const zip = require('./zip');
const areEqual = require('../are-equal');

function areListValuesEqual(...lists) {
    return zip(lists).every((zippedValues) => areEqual(...zippedValues));
}

module.exports = areListValuesEqual;