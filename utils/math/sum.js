function sum(...values) {
    return values.reduce((result, value) => result + value, 0);
}

module.exports = sum;
