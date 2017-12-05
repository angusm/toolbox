const getOpacity = require('../style/get-opacity');
const getVisibleHeight = require('./get-visible-height');
const getVisibleWidth = require('./get-visible-width');

function getVisibleArea(target, container, factorInOpacity = false) {
    const opacityFactor = factorInOpacity ? getOpacity(target) : 1;
    return getVisibleWidth(target, container) *
        getVisibleHeight(target, container) * opacityFactor;
}

module.exports = getVisibleArea;
