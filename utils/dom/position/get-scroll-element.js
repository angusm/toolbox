function getScrollElement() {
  return document.scrollingElement || document.documentElement;
}

module.exports = getScrollElement;
