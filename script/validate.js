//Функция добавления ошибки
  const addError = (inputElement, errorMessage, validationSettings) => {
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorMessage.classList.add(validationSettings.errorClass);
    errorMessage.textContent = inputElement.validationMessage;
  };
//Функция удаления ошибки
  const removeError = (inputElement, errorMessage, validationSettings) => {
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorMessage.classList.remove(validationSettings.errorClass);
    errorMessage.textContent = "";
  };
//Функция блокировки кнопки
  const invalidButton = (formElement, submitButton, validationSettings) => {
    if (formElement.checkValidity()) {
        submitButton.removeAttribute("disabled");
        submitButton.classList.remove(validationSettings.inactiveButtonClass);
    } else {
        submitButton.setAttribute("disabled", "");
        submitButton.classList.add(validationSettings.inactiveButtonClass);
    }
  };
//Функция проверки поля
  function validateInput(inputElement, validationSettings) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    if (inputElement.checkValidity()) {
      removeError(inputElement, errorElement, validationSettings);
    } else {
      addError(inputElement, errorElement, validationSettings);
    }
  }
//Функция установки слушателя на все поля
  const eventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const submitButton = formElement.querySelector(validationSettings.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
        validateInput(inputElement, validationSettings);
        invalidButton(formElement, submitButton, validationSettings);
      });
    });
  };
//Функция включения валидации
  function enableValidation(validationSettings) {
    const formList = document.querySelectorAll(validationSettings.formSelector);
    formList.forEach((formElement) => {
      eventListeners(formElement, validationSettings);
    });
  }
//Включение валидации
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-button-save',
    inactiveButtonClass: 'popup__form-button-save_invalid',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error'
  });