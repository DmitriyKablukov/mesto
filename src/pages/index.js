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
  userNameInput,
  userDescriptionInput,
  profileName,
  profileDescription,
  popupAdd,
  profileAddButton,
  popupImage,
} from "../utils/constants.js";

//Функционал попапа добавления карточки
const popupAddCard = new PopupWithForm({
  popup: popupAdd,
  handleFormSubmit: (formItem) => {
    cardsSection.addItem(generateCard(formItem));
    popupAddCard.close();
  },
});

profileAddButton.addEventListener("click", () => {
  popupAddCard.open();
  validationImage.disableButton();
});

popupAddCard.setEventListeners();

//Функционал попапа редактирования информации
const popupEditProfile = new PopupWithForm({
  popup: popupInfo,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close();
  },
});

const userInfo = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription,
});

const addUserInfo = () => {
  popupEditProfile.open();
  const user = userInfo.getUserInfo();
  userNameInput.value = user.profileName;
  userDescriptionInput.value = user.profileDescription;
};

profileEditButton.addEventListener("click", addUserInfo);

popupEditProfile.setEventListeners();

//Открытие попапа с изображением
const popupImageFullView = new PopupWithImage(popupImage);

function handleCardClick(item) {
  popupImageFullView.open(item);
}

popupImageFullView.setEventListeners();

//Создание новой карточки
function generateCard(cardData) {
  const card = new Card(cardData, ".element-template", (data) =>
    handleCardClick(data)
  );
  return card.createCard();
}

//Добавление элементов по умолчанию
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = generateCard(item);
      cardsSection.addItem(card);
    },
  },
  ".elements"
);

cardsSection.renderItems();

//Включение валидации
const profileForm = document.forms.info;
const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();
const popupImageForm = document.forms.add;
const validationImage = new FormValidator(validationSettings, popupImageForm);
validationImage.enableValidation();
