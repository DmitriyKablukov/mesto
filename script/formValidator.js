class FormValidator {
  constructor ( settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
  }
//Добавление ошибки
_addError (inputElement, errorMessage) {
  inputElement.classList.add(this._inputErrorClass);
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
};
//Удаление ошибки
_removeError (inputElement) {
  inputElement.classList.remove(this._inputErrorClass);
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};
//Проверка поля
_validateInput (inputElement) {
  if (!inputElement.validity.valid) {
    this._addError(inputElement, inputElement.validationMessage);
  } else {
     this._removeError(inputElement);
  }
};
//Включение кнопки
_enableButton () {
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.disabled = false;
}
//Отключение кнопки
_disableButton () {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.disabled = true;
}
//Проверка валидности полей
_invalidButton () {
  if (this._inputList.some((inputElement)=> {
    return !inputElement.validity.valid;
  })) {
    this._disableButton ();
  }
  else {
    this._enableButton ();
  }
}
//Установка слушателя на все поля
_eventListeners () {
  this._inputList.forEach (inputElement => {
    inputElement.addEventListener ('input', () => {
      this._validateInput(inputElement)
      this._invalidButton();
    });
  });
};
//Включение валидации
enableValidation() {
    this._formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault()
    });
  this._eventListeners();
}
}

export default FormValidator;
