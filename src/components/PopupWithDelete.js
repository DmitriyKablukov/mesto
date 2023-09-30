import Popup from "./Popup";

class PopupWithDelete extends Popup {
  constructor(popup) {
    super(popup);
    this._popup = popup;
    this._form = this._popup.querySelector(".popup__form");
  }
  //Действие по нажатаю кнопки
  deleteButtonEvent(id) {
    this._handleSubmit = id;
  }
  //Открытие попапа
  open(id) {
    this._id = id;
    super.open();
  }
  //Установка слушателей на отправку формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._handleSubmit(this._id);
      evt.preventDefault();
    });
  }
}

export default PopupWithDelete;
