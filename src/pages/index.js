import './index.css';
import { initialCards } from "../utils/initialCards.js";
import { validationSettings } from "../utils/validationSettings.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupInfo,
  profileEditButton,
  popupCloseButtonInfo,
  popupFormInfo,
  userNameInput,
  userDescriptionInput,
  profileName,
  profileDescription,
  popupAdd,
  profileAddButton,
  popupCloseButtonAdd,
  popupFormAdd,
  placeNameInput,
  placeLinkInput,
  cardsContainer,
  popupImage,
  popupCloseButtonImage,
  popupImagePlaceName,
  popupImagePicture,
  popupList,
} from "../utils/constants.js";

//Функционал попапа добавления карточки
const openAddPopup = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (formItem) => {
    cardsList.addItem(generateCard(formItem));
    openAddPopup.close();
  },
});

profileAddButton.addEventListener("click", () => {
  openAddPopup.open();
  validationImage.disableButton();
});

openAddPopup.setEventListeners();

//Функционал попапа редактирования информации
const openEditProfilePopup = new PopupWithForm({
  popupSelector: popupInfo,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    openEditProfilePopup.close();
  },
});

const userInfo = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription,
});

profileEditButton.addEventListener("click", () => {
  openEditProfilePopup.open();
  const user = userInfo.getUserInfo();
  userNameInput.value = user.profileName;
  userDescriptionInput.value = user.profileDescription;
});

openEditProfilePopup.setEventListeners();

//Открытие попапа с изображением
const popupImageFullView = new PopupWithImage(popupImage);

function handleCardClick(item) {
  popupImageFullView.open(item);
}

popupImageFullView.setEventListeners();

//Создание новой карточки
function generateCard(item) {
  const card = new Card(item, ".element-template", (data) =>
    handleCardClick(data)
  );
  return card.createCard();
}

//Добавление элементов по умолчанию
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = generateCard(item);
      cardsList.addItem(card);
    },
  },
  ".elements"
);

cardsList.renderItems();

//Включение валидации
const profileForm = document.forms.info;
const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();
const popupImageForm = document.forms.add;
const validationImage = new FormValidator(validationSettings, popupImageForm);
validationImage.enableValidation();
