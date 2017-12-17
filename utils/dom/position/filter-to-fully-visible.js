const isFullyVisible = require('./is-fully-visible');

function filterToFullyVisible(elements, container = null) {
    return [...elements]
      .filter((element) => isFullyVisible(element, container));
}

module.exports = filterToFullyVisible;
