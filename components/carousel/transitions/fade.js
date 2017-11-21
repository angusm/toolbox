const Transition = require('./base');
const getOpacity = require('../../../utils/dom/get-opacity');
const renderLoop = require('../../../utils/render-loop');

class Fade extends Transition {
    constructor(step = 0.1) {
        super();
        this.step_ = step;
    }

    transition(targetSlide, carousel) {
        const slidesToFade =
            carousel.getSlides().filter((slide) => slide !== targetSlide);
        slidesToFade.map((slide) => {
            renderLoop.measure(() => {
                const opacity = getOpacity(slide);
                renderLoop.mutate(
                    () => slide.style.opacity = opacity - this.step_);
            });
        });
        renderLoop.measure(() => {
           const opacity = getOpacity(targetSlide);
           renderLoop.mutate(() => {
               console.log(opacity);
               targetSlide.style.opacity = Math.max(1, opacity + this.step_)
           });
        });
    }
}

module.exports = Fade;