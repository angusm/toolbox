const getOpacity = require('../../../utils/dom/get-opacity');
const renderLoop = require('../../utils/render-loop');

function fade(targetSlide, carousel) {
    const slidesToFade =
        carousel.getSlides().filter((slide) => slide !== targetSlide);
    slidesToFade.map((slide) => {
        renderLoop.measure(() => {
            const opacity = getOpacity(slide);
            renderLoop.mutate(() => slide.style.opacity = opacity - step);
        })
    })
}

module.exports = fade;