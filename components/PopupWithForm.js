import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
  }
  //Получение данных из формы
  _getInputValues() {
    this._inputList = Array.from(this._inputs);
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  //Установка слушателей на отправку формы
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
  //Закрытие попапа
  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
