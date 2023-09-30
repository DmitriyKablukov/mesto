class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //Отрисовка всех элементов
  addItem(element) {
    this._container.prepend(element);
  }
  //Добавление DOM-элемента в контейнер
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
