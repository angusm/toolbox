const Carousel = require('./carousel');
const DynamicDefaultMap = require('./map/dynamic-default');
const RenderLoop = require('../../utils/render-loop');

const DefaultClass = Object.freeze({
    ACTIVE_NAV_ITEM: 'active',
});

function createDefaultNavItem(slide) {
    const element = document.createElement('li');
    element.innerHTML = '.';
    return element;
}

class CarouselNav {
    constructor(carousel, navElement, createNavItemFn=createDefaultNavItem()) {
        this.carousel_ = carousel;
        this.navElement_ = navElement;
        this.navItems_ =
            new DynamicDefaultMap((slide) => createNavItemFn(slide));
        this.init_();
    }

    init_() {
        RenderLoop.measure(() => this.render_());
    }

    render_() {
        const activeSlide = this.carousel_.getActiveSlide();
        RenderLoop.mutate(() => {
            this.resetNavItems_();
            this.markActiveNavItem(activeSlide);
            RenderLoop.measure(() => this.render_());
        });
    }

    resetNavItems_() {
        this.navElement_.innerHTML = '';
        this.carousel_.getSlides().forEach(
            (slide) => this.resetNavItemForSlide_(slide));
    }

    resetNavItemForSlide_(slide) {
        const navItem = this.navItems_.get(slide);
        this.navElement_.appendChild(navItem);
        navItem.classList.remove(DefaultClass.ACTIVE_NAV_ITEM);
    }

    markActiveNavItem(activeSlide) {
        this.navItems_.get(activeSlide)
            .classList.add(DefaultClass.ACTIVE_NAV_ITEM);
    }
}

module.exports = CarouselNav;
