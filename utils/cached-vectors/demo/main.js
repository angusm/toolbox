const Dimensions = require('../dimensions');
const Scroll = require('../scroll');
const cursor = require('../cursor');
const renderLoop = require('../../render-loop');

const scroll = Scroll.getSingleton();
const dimension = Dimensions.getSingleton();

function update() {
  renderLoop.mutate(() => {
    console.log(
      `Cursor: ${cursor.getClient().getPosition().x}, ${cursor.getClient().getPosition().y}\n` +
      `Window Scroll: ${scroll.getPosition().x}, ${scroll.getPosition().y}\n` +
      `Window Dimensions: ${dimension.getDimensions().x}, ${dimension.getDimensions().y}\n`
    );
    renderLoop.measure(update);
  });
}

update();
