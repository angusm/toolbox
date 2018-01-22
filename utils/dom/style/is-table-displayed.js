const toBool = require('../../to-bool');

const TABLE_DISPLAY_STYLES = [
  'table',
  'table-cell',
  'table-row',
];

function isTableDisplayed(element) {
    return toBool(
      TABLE_DISPLAY_STYLES.find((style) => element.style.display === style));
}

module.exports = isTableDisplayed;