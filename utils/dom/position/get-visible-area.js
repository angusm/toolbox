const getVisibleHeight = require('./get-visible-height');
const getVisibleWidth = require('./get-visible-width');

function getVisibleArea(target, container) {
    return getVisibleWidth(target, container) *
        getVisibleHeight(target, container);
}

module.exports = getVisibleArea;
