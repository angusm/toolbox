const DynamicDefaultMap = require('./map/dynamic-default');

const Step = Object.freeze({
  CLEANUP: Symbol('Cleanup'),
  FRAME_COUNT: Symbol('Frame Count'),
  MEASURE: Symbol('Measure'),
  MUTATE: Symbol('Mutate'),
  PRE_MEASURE: Symbol('Pre-measure'),
});

const STEP_ORDER = Object.freeze([
  Step.FRAME_COUNT,
  Step.PRE_MEASURE,
  Step.MEASURE,
  Step.MUTATE,
  Step.CLEANUP,
]);

const FPS = 60;

class RenderFunction {
  constructor(step) {
    this.step_ = step;
  }

  get step() {
    return this.step_;
  }
}

let singleton;
class RenderLoop {
  constructor() {
    this.scheduledFns_ = DynamicDefaultMap.usingFunction(() => new Map());
    this.lastRunTime_ = new Date(0);
    this.runLoop_();
  }

  framecount(fn) {
    return this.addFnToStep_(fn, Step.FRAME_COUNT);
  }

  premeasure(fn) {
    return this.addFnToStep_(fn, Step.PRE_MEASURE)
  }

  measure(fn) {
    return this.addFnToStep_(fn, Step.MEASURE);
  }

  mutate(fn) {
    return this.addFnToStep_(fn, Step.MUTATE);
  }

  cleanup(fn) {
    return this.addFnToStep_(fn, Step.CLEANUP);
  }

  addFnToStep_(fn, step) {
    const renderFn = new RenderFunction(step);
    this.scheduledFns_.get(step).set(renderFn, fn);
    return renderFn;
  }

  getTimeUntilNextRun_() {
    return this.lastRunTime_ + 1000 / FPS - new Date();
  }

  runLoop_() {
    if (this.getTimeUntilNextRun_() > 0) {
      setTimeout(() => this.runLoop_(), this.getTimeUntilNextRun_());
    } else {
      this.runFns_();
      this.lastRunTime_ = +new Date();
      window.requestAnimationFrame(() => this.runLoop_());
    }
  }

  runFns_() {
    STEP_ORDER.forEach((step) => this.runFnsForStep_(step));
  }

  runFnsForStep_(step) {
    const fns = this.scheduledFns_.get(step).values();
    let nextFn;
    while (nextFn = fns.next().value) {
      nextFn();
    }
    this.scheduledFns_.set(step, new Map());
  }

  clear(renderFn) {
    this.scheduledFns_.get(renderFn.step).delete(renderFn);
  }

  static getSingleton() {
    return singleton = singleton || new this();
  }
}

module.exports = RenderLoop.getSingleton();
