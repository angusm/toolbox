const getScrollElement = require('./get-scroll-element');

function setScroll(scrollPosition, element = null) {
    const scrollElement = element || getScrollElement();
    setScrollLeft(scrollPosition.x, scrollElement);
    setScrollTop(scrollPosition.y, scrollElement);
}

module.exports = setScroll;
