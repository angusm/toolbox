class DynamicDefaultMap extends Map {
    constructor(iterable, defaultFunction) {
        super(iterable);
        this.defaultFunction_ = defaultFunction;
    }

    get(key) {
        if (!this.has(key)) {
            this.set(key, this.defaultFunction_(key));
        }
        return super.get(key);
    }
}

module.exports = DynamicDefaultMap;
