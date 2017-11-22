function getOpacity(element) {
    const parsedOpacity = parseFloat(element.style.opacity);
    return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}

module.exports = getOpacity;