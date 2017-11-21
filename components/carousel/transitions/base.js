class Transition {
    constructor() {}

    transition(targetSlide, carousel) {
        console.error('Child class should override');
    }
}

module.exports = Transition;