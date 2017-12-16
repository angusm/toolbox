const HorizontalScroll = require('../horizontal');
const VerticalScroll = require('../vertical');

new HorizontalScroll(
  document.querySelector('.horizontal-inner-container'),
  document.querySelector('.horizontal-outer-container'));
new VerticalScroll(
  document.querySelector('.vertical-inner-container'),
  document.querySelector('.vertical-outer-container'));