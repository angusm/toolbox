const defaultSymbol = require('../../default-symbol');
const getAsList = require('../../iterable/get-as-list');
const getAttributeValue = require('./../get-attribute-value');
const runMapAsSwitch = require('../../run-map-as-switch');

const getValueFnsByType = new Map([
  ['checkbox', isChecked_],
  ['radio', getRadioInputValue_],
  [defaultSymbol, (input) => input.value],
]);

function isChecked_(input) {
  return input.checked;
}

function getRadioInputValue_(input) {
  const checkedInput =
    getAsList(getMatchingRadioInputs_(input)).find(isChecked_);
  if (checkedInput) {
    return checkedInput.value;
  } else {
    return null;
  }
}

function getMatchingRadioInputs_(input) {
  const name = getAttributeValue(input, 'name');
  return document.body.querySelectorAll(`input[type="radio"][name="${name}"]`);
}

function getInputValue(input) {
  const type = getAttributeValue(input, 'type');
  return runMapAsSwitch(getValueFnsByType, type, input);
}

module.exports = getInputValue;
