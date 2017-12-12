function getSymbolString(symbol) {
  const ending = symbol.toString().split('Symbol(').slice(1).join('Symbol(');
  return ending.split(')').slice(0, -1).join(')');
}

module.exports = getSymbolString;
