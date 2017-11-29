const MapWrapper = require('./map-wrapper');
const DynamicDefaultMap = require('./dynamic-default');

class MultiValueMap extends MapWrapper {
    constructor(iterable = []) {
        super(iterable);
        let uid = 0;
        this.uidsToValue_ = new Map();
        this.uids_ = DynamicDefaultMap.usingFunction((value) => {
            const nextUid = '' + uid++;
            this.uidsToValue_.set(nextUid, value);
            return nextUid;
        });
    }

    clear() {
        super.clear();
        this.uidsToValue_.clear();
        this.uids_.clear();
    }

    convertToKey_(keys) {
        return keys.map((key) => this.uids_.get(key)).join('-');
    }

    convertToValues_(key) {
        return key.split('-').map((uid) => this.uidsToValue_.get(uid));
    }

    get(...keys) {
        return super.get(this.convertToKey_(keys));
    }

    delete(...keys) {
        return super.delete(this.convertToKey_(keys));
    }

    has(...keys) {
        return super.has(this.convertToKey_(keys));
    }

    keys() {
        return super.keys().map((key) => this.convertToValues_(key));
    }

    set(...keysAndValue) {
        const keys = keysAndValue.slice(0, -1);
        const value = keysAndValue.slice(-1)[0];
        return super.set(this.convertToKey_(keys), value);
    }
}

module.exports = MultiValueMap;
