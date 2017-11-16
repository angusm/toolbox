const DynamicDefaultMap = require('./map/dynamic-default');

const Step = Object.freeze({
    MEASURE: Symbol('Measure'),
    MUTATE: Symbol('Mutate'),
});

const STEP_ORDER = Object.freeze([Step.MEASURE, Step.MUTATE]);

const FPS = 1;

class RenderFunction {
    constructor (step) {
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

    measure(fn) {
        return this.addFnToStep_(fn, Step.MEASURE);
    }

    mutate(fn) {
        return this.addFnToStep_(fn, Step.MUTATE);
    }

    addFnToStep_(fn, step) {
        const renderFn = new RenderFunction(step);
        this.scheduledFns_.get(step).set(renderFn, fn);
        return renderFn;
    }

    getTimeUntilNextRun_() {
        return this.lastRunTime_ + 1000 / FPS  - new Date();
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
        [...this.scheduledFns_.get(step).values()].forEach((fn) => fn());
        this.scheduledFns_.set(step, new Map());
    }

    cancel(renderFn) {
        this.scheduledFns_.get(renderFn.step).delete(renderFn);
    }

    static getSingleton() {
        return singleton = singleton || new RenderLoop();
    }
}

module.exports = RenderLoop.getSingleton();
