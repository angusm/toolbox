const getScrollElement = require('./get-scroll-element');

function setScrollLeft(scrollPosition, element = null) {
    const scrollElement = element || getScrollElement();
    scrollElement.scrollLeft = scrollPosition;
}

module.exports = setScrollLeft;
