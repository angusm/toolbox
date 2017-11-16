const MapWrapper = require('./map-wrapper');

class DynamicDefaultMap extends MapWrapper {
    constructor(iterable = [], defaultFunction = doNothing) {
        super(iterable);
        this.defaultFunction_ = defaultFunction;
    }

    get(key) {
        if (!this.has(key)) {
            this.set(key, this.defaultFunction_(key));
        }
        return super.get(key);
    }

    static usingFunction(defaultFunction) {
        return new DynamicDefaultMap([], defaultFunction);
    }
}

module.exports = DynamicDefaultMap;
