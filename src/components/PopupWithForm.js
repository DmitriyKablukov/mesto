import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popup, handleFormSubmit }) {
    super(popup);
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._form.querySelector(".popup__form-button-save");
    this._submitButtonText = this._submitButton.textContent;
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
  //Закрытие попапа
  close() {
    super.close();
    this._form.reset();
  }
  //Функционал при нажатии на кнопку submit
  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
  //Установка слушателей на отправку формы
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
