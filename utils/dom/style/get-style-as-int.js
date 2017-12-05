const getStyleAsFloat = require('./get-style-as-float');

function getStyleAsInt(element, style) {
    return Math.round(getStyleAsFloat(element, style));
}

module.exports = getStyleAsInt;