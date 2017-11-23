const Matrix = require('./matrix');
const renderLoop = require('./../../render-loop');

function translate2d(element, vector) {
  renderLoop.measure(() => {
    const targetMatrix = Matrix.fromElementTransform(element).translate(vector);
    renderLoop.mutate(() => targetMatrix.applyToElementTransform(element));
  });
}

module.exports = translate2d;
