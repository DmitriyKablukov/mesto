import { initialCards } from "./elements.js";
import { settings } from "./validationSettings.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//Объявление переменных
const popupInfo = document.querySelector(".popup_info");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupCloseButtonInfo = popupInfo.querySelector(
  ".popup__close-button_info"
);
const popupFormInfo = popupInfo.querySelector(".popup__form_info");
const userNameInput = popupFormInfo.querySelector(".popup__input_data_name");
const userDescriptionInput = popupFormInfo.querySelector(
  ".popup__input_data_description"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupAdd = document.querySelector(".popup_add");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButtonAdd = popupAdd.querySelector(".popup__close-button_add");
const popupFormAdd = popupAdd.querySelector(".popup__form_add");
const placeNameInput = popupFormAdd.querySelector(".popup__input_data_place");
const placeLinkInput = popupFormAdd.querySelector(".popup__input_data_link");
const cardsContainer = document.querySelector(".elements");
const popupImage = document.querySelector(".popup_image");
const popupCloseButtonImage = popupImage.querySelector(
  ".popup__close-button_image"
);
const popupImagePlaceName = popupImage.querySelector(
  ".popup__image-place-name"
);
const popupImagePicture = popupImage.querySelector(".popup__image-picture");
const popupList = document.querySelectorAll(".popup");

//Функция открытия модального окна
function openPopup(item) {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}
//Функция закрытия модального окна
function closePopup(item) {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}
//Функция закрытия модального окна по нажатию клавиши Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}
//Функция закрытия модального окна по нажатию на оверлей
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) closePopup(evt.currentTarget);
}
//Слушатель клика на оверлей
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", closePopupOverlay);
});
//Слушатель закрытия popupImage
popupCloseButtonImage.addEventListener("click", function () {
  closePopup(popupImage);
});
//Функция добавления информации при открытии popupInfo
const openEditProfilePopup = function () {
  userNameInput.value = profileName.textContent;
  userDescriptionInput.value = profileDescription.textContent;
  openPopup(popupInfo);
};
//Функция отправки данных popupInfo
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const profileNameValue = userNameInput.value;
  const profileDescriptionValue = userDescriptionInput.value;
  profileName.textContent = profileNameValue;
  profileDescription.textContent = profileDescriptionValue;
  closePopup(popupInfo);
}
//Слушатель открытия popupInfo
profileEditButton.addEventListener("click", openEditProfilePopup);
//Слушатель закрытия popupInfo
popupCloseButtonInfo.addEventListener("click", function () {
  closePopup(popupInfo);
});
//Слушатель отправки данных popupInfo
popupFormInfo.addEventListener("submit", handleFormEditSubmit);
//Слушатель открытия popupAdd
profileAddButton.addEventListener("click", function () {
  openPopup(popupAdd);
});
//Слушатель закрытия popupAdd
popupCloseButtonAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});
//Функция создания новой карточки
function createCard(item) {
  const card = new Card(item, ".element-template");
  return card.createCard();
}
//Добавление элементов по умолчанию
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});
//Функция добавления нового элемента
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(
    createCard({ name: placeNameInput.value, link: placeLinkInput.value })
  );
  popupFormAdd.reset();
  validationImage.disableButton();
  closePopup(popupAdd);
}
//Слушатель события отправки popupAdd
popupFormAdd.addEventListener("submit", handleCardFormSubmit);
//Добавление валидации на попапы
const profileForm = document.forms.info;
const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();
const popupImageForm = document.forms.add;
const validationImage = new FormValidator(settings, popupImageForm);
validationImage.enableValidation();

export { openPopup, popupImage, popupImagePlaceName, popupImagePicture };