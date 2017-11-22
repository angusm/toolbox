const getVisibleArea = require('./get-visible-area');

function isFullyVisible(target, container, factorInOpacity=false) {
    return getVisibleArea(target, container, factorInOpacity) ===
            target.offsetWidth * target.offsetHeight;
}

module.exports = isFullyVisible;
