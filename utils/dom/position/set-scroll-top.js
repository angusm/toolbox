const getScrollElement = require('./get-scroll-element');

function setScrollTop(scrollPosition, element = null) {
    const scrollElement = element || getScrollElement();
    scrollElement.scrollTop = scrollPosition;
}

module.exports = setScrollTop;
