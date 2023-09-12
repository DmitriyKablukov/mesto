class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }
  //Отрисовка всех элементов
  addItem(element) {
    this._container.prepend(element);
  }

  //Добавление DOM-элемента в контейнер
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
