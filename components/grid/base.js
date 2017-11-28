function defaultCreateSquareFn(item) {
  let element = document.createElement('li');
  element.innerText = item;
  return element;
}

class Grid {
  constructor(
    container,
    items,
    {
      createSquareFn = defaultCreateSquareFn
    } = {}
  ) {
    this.container_ = container;
    this.items_ = items;
    this.createSquareFn_ = createSquareFn;
  }



}

module.exports = Grid;