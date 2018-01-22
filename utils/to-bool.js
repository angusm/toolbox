/**
 * Sole purpose of this function is to ensure real boolean values instead of
 * truthy and falsey values.
 */

function toBool(val) {
    return val ? true : false;
}

module.exports = toBool;
