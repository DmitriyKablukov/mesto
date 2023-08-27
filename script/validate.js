
//Функции блокировки кнопки
const enableButton = (submitButton) => {
  submitButton.removeAttribute("disabled");
  submitButton.classList.remove('popup__form-button-save_invalid');
};
const disableButton = (submitButton) => {
  submitButton.setAttribute("disabled", "");
  submitButton.classList.add('popup__form-button-save_invalid');
};
const invalidButton = (formElement, submitButton, validationSettings) => {
  if (formElement.checkValidity()) {
    enableButton(submitButton, validationSettings);
  } else {
    disableButton(submitButton, validationSettings);
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
  