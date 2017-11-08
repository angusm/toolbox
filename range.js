class Range {
    constructor(min, max) {
        this.min_ = min;
        this.max_ = max;
    }

    clamp(value) {
        return Math.min(this.max_, Math.max(this.min_, value));
    }

    contains(value) {
        return this.min_ <= value && value <= this.max_;
    }
}

module.exports = Range;
