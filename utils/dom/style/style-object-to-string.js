const getKeyValuePairs = require('../../iterable/get-key-value-pairs');

function styleObjectToString(styleObject) {
    const styles = getKeyValuePairs(styleObject)
        .map((kvp) => kvp.join(': '))
        .join('; ');
    return `${styles};`;
}

module.exports = styleObjectToString;