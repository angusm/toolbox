function areEqual(target, ...values) {
    return values.every((value) => target === value);
}

module.exports = areEqual;
