const Dimensions2d = require('../../math/geometry/dimensions-2d');
const getVisibleHeight = require('./get-visible-height');
const getVisibleWidth = require('./get-visible-width');

function getVisibleDimensions(target, container = null) {
  return new Dimensions2d(
    getVisibleWidth(target, container), getVisibleHeight(target, container));
}

module.exports = getVisibleDimensions;
