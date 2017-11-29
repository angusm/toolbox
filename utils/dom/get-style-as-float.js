function getStyleAsFloat(element, style) {
    const parsedOpacity = parseFloat(element.style[style]);
    return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}

module.exports = getStyleAsFloat;