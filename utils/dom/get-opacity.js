const getStyleAsFloat = require('./get-style-as-float');

function getOpacity(element) {
    return getStyleAsFloat(element, 'opacity');
}

module.exports = getOpacity;