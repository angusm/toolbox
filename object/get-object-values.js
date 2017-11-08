function getObjectValues(obj) {
    return Object.keys(obj).map((key) => obj[key]);
}

module.exports = getObjectValues;
