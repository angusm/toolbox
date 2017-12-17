const Scroll = require('../../utils/cached-vectors/scroll');
const renderLoop = require('../../utils/render-loop');
const setScrollTop = require('../../utils/dom/position/set-scroll-top');

const windowScroll = Scroll.getSingleton();

const CLASS_NAME = 'deep-link-by-scroll';

function updateClassList(anchorId) {
  const classToAdd = `${CLASS_NAME}--${anchorId}`;
  const html = document.querySelector('html');
  const classesToRemove =
    [...html.classList].filter(
      (className) => className.indexOf(CLASS_NAME) !== -1 &&
          className !== CLASS_NAME &&
          className !== classToAdd);
  classesToRemove.forEach((className) => html.classList.remove(className));
  if (!html.classList.contains(classToAdd)) {
    html.classList.add(classToAdd);
  }
}

class DeepLinkByScroll {
  constructor(getCurrentAnchorFn) {
    this.getCurrentAnchor_ = getCurrentAnchorFn;
    this.init_();
  }

  init_() {
    renderLoop.mutate(
      () => document.querySelector('html').classList.add(CLASS_NAME));
    this.render_();
  }

  render_() {
    renderLoop.measure(() => {
      const currentAnchor = this.getCurrentAnchor_();
      const currentScroll = windowScroll.getPosition().y;
      renderLoop.mutate(() => {
        updateClassList(currentAnchor.id);
        window.location.hash = currentAnchor.id;
        setScrollTop(currentScroll); // Reset the scroll position
      });
      renderLoop.cleanup(() => this.render_());
    });
  }
}

module.exports = DeepLinkByScroll;
