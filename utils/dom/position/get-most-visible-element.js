const getVisibleArea = require('./get-visible-area');
const max = require('../../iterable/max');

function getMostVisibleElement(elements, container) {
    return max(elements, (element) => getVisibleArea(element, container));
}

module.exports = getMostVisibleElement;
