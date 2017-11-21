const renderLoop = require('../../utils/render-loop');

const Class = Object.freeze({
    CONTAINER: 'accordion',
    CONTENT: 'accordion__content',
    ITEM: 'accordion__item',
    TOGGLE: 'accordion__toggle',
});

const ClassModifier = Object.freeze({
    HIDDEN: 'hidden',
    VISIBLE: 'visible',
});

class AccordionItem {
    constructor(item, contentSelector, toggleSelector) {
        this.content_ = item.querySelector(`.${contentSelector}`);
        this.contentSelector_ = contentSelector;
        this.toggle_ = item.querySelector(`.${toggleSelector}`);
        this.init_();
    }

    init_() {
        this.toggle_.addEventListener('click', () => this.toggleVisibility());
    }

    getModifiedContentClass_(classModifier) {
        return `${this.contentSelector_}--${classModifier}`;
    }

    getVisibleClass() {
        return this.getModifiedContentClass_(ClassModifier.VISIBLE);
    }

    getHiddenClass() {
        return this.getModifiedContentClass_(ClassModifier.HIDDEN);
    }

    toggleVisibility() {
        renderLoop.measure(() => {
            if (this.content_.classList.contains(this.getVisibleClass())) {
                this.hideContent();
            } else {
                this.showContent();
            }
        });
    }

    hideContent() {
        renderLoop.mutate(() => {
            this.content_.classList.remove(this.getVisibleClass());
            this.content_.classList.add(this.getHiddenClass());
        });
    }

    showContent() {
        renderLoop.mutate(() => {
            this.content_.classList.add(this.getVisibleClass());
            this.content_.classList.remove(this.getHiddenClass());
        });
    }
}

class Accordion {
    constructor (
        container,
        {
            contentSelector = Class.CONTENT,
            itemSelector = Class.ITEM,
            toggleSelector = Class.TOGGLE,
        } = {}
    ) {
        this.container_ = container;
        this.items_ =
            Accordion.getItems(
                container, itemSelector, contentSelector, toggleSelector);
    }

    static getItems(container, itemSelector, contentSelector, toggleSelector) {
        return [...container.querySelectorAll(`.${itemSelector}`)].map(
            (item) => new AccordionItem(item, contentSelector, toggleSelector));
    }
}

module.exports = Accordion;
