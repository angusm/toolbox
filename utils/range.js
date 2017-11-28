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

    adjust(value) {
        return new Range(this.min_ + value, this.max_ + value);
    }

    expand(value) {
        return new Range(this.min_ - value, this.max_ + value);
    }

    collapse(value) {
        return this.expand(-value);
    }
}

module.exports = Range;
