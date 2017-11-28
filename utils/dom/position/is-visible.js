const getVisibleArea = require('./get-visible-area');

function isVisible(target, container, factorInOpacity = false) {
    return getVisibleArea(target, container, factorInOpacity) > 0;
}

module.exports = isVisible;
