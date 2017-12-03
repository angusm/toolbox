const Vector = require('../math/geometry/vector');
const getSubstringsOfLength = require('../string/get-substrings-of-length');
const hexToInt = require('../hex-to-int');
const max = require('../iterable/max');
const trim = require('../string/trim');

class RGB extends Vector {
  constructor(red = 0, green = 0, blue = 0) {
    super(red, green, blue);
    this.red_ = red;
    this.green_ = green;
    this.blue_ = blue;
  }
}


class Color {
  constructor(red = 0, green = 0, blue = 0, alpha = 1) {
    this.rgb_ = new RGB(red, green, blue);
    this.alpha_ = alpha;
  }

  static fromString(value) {
    if (value[0] === '#') {
      return this.fromHex_(value);
    } else if (value.slice(0, 3) === 'rgb') {
      return this.fromRgb_(value);
    } else {
      console.error('Invalid string provided to Color.fromString');
    }
  }

  static fromHex_(value) {
    const hexValue = value.split('#').slice(-1)[0];
    if (hexValue.length !== 3 && hexValue.length !== 6) {
      console.error('Invalid hexValue provided to Color');
    }
    const valueLength = hexValue.length / 3;
    const colorValues = getSubstringsOfLength(hexValue, valueLength);
    return new Color(...colorValues.map((colorValue) => hexToInt(colorValue)));
  }

  static fromRgb_(value) {
    const values = value.split('(').slice(-1)[0].split(')')[0].split(',');
    const intValues = values.map(trim).map(parseInt);
    return new Color(...intValues);
  }

  getRGB() {
    return this.rgb_;
  }

  getColorWithHighestContrast(...colors) {
    return max(
      colors, (color) => color.getRGB().subtract(this.getRGB()).getLength());
  }
}

module.exports = Color;
