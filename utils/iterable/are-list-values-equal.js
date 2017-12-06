const zip = require('./zip');
const areEqual = require('../are-equal');

function areListValuesEqual(...lists) {
    return lists.every((list) => list) &&
        areEqual(...lists.map((list) => list.length)) &&
        zip(...lists).every((zippedValues) => areEqual(...zippedValues));
}

module.exports = areListValuesEqual;