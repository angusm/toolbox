const DynamicDefaultMap = require('./map/dynamic-default');

const Step = Object.freeze({
    MEASURE: new Symbol('Measure'),
    MUTATE: new Symbol('Mutate'),
});

const STEP_ORDER = Object.freeze([Step.MEASURE, Step.MUTATE]);

const scheduledFns_ = new DynamicDefaultMap(() => new Map());

function addFnToStep(fn, step) {
    const renderFn = new RenderFunction(step);
    scheduledFns_.get(step).set(renderFn, fn);
    return renderFn;
}

class RenderFunction {
    constructor (step) {
        this.step_ = step;
    }

    cancel() {
        scheduledFns_.get(this.step_).delete(this);
    }
}

class RenderLoop {
    static measure(fn) {
        addFnToStep(fn, Step.MEASURE);
    }

    static mutate(fn) {
        addFnToStep(fn, Step.MUTATE);
    }
}

function runLoop() {
    STEP_ORDER.forEach((step) => runFnsForStep(step));
    window.requestAnimationFrame(runLoop);
}

function runFnsForStep(step) {
    scheduledFns_.get(step).values().forEach((fn) => fn());
}

runLoop();

module.exports = RenderLoop;
