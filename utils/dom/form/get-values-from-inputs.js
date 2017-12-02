const getAsList = require('../../iterable/get-as-list');
const getAttributeValue = require('../get-attribute-value');
const getInputValue = require('./get-input-value');

function getValuesFromInputs(inputs) {
  return getAsList(inputs)
    .reduce(
      (result, input) => {
        const inputName = getAttributeValue(input, 'name');
        result[inputName] = getInputValue(input);
        return result;
      }, {});
}

module.exports = getValuesFromInputs;
