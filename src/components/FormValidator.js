class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }
  //Добавление ошибки
  _addError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  //Удаление ошибки
  _removeError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  //Проверка поля
  _validateInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._addError(inputElement, inputElement.validationMessage);
    } else {
      this._removeError(inputElement);
    }
  }
  //Включение кнопки
  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  //Отключение кнопки
  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  //Проверка валидности полей
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //Переключение кнопки
  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }
  //Установка слушателя на все поля
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._validateInput(inputElement);
        this._toggleSubmitButton();
      });
    });
  }
  //Включение валидации
  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
