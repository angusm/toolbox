const getOpacity = require('../get-opacity');
const getVisibleArea = require('./get-visible-area');
const max = require('../../iterable/max');

const ScoreFunction = new Map([
    [false, getVisibleArea],
    [true, getVisibleAreaMultipliedByOpacity]
]);

function getVisibleAreaMultipliedByOpacity(element, container) {
    return getOpacity(element) * getVisibleArea(element, container);
}

function getMostVisibleElement(elements, container, factorInOpacity=false) {
    const scoreFunction = ScoreFunction.get(factorInOpacity);
    return max(elements, (element) => scoreFunction(element, container));
}

module.exports = getMostVisibleElement;
