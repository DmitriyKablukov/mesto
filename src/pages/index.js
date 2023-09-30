import "./index.css";
import { validationSettings } from "../utils/validationSettings.js";
import { optionsApi } from "../utils/apiOptions";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import {
  profileEditButton,
  profileName,
  profileDescription,
  profileAvatar,
  popupInfo,
  userNameInput,
  userDescriptionInput,
  profileAddButton,
  popupAdd,
  popupImage,
  popupDelete,
  popupAvatar,
} from "../utils/constants.js";

const api = new Api(optionsApi);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([data, cards]) => {
    userId = data._id;
    userInfo.setUserInfo(data);
    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка получения данных. ${err}`);
  });

//Функционал попапа добавления карточки
function handlePopupAddSubmit(formItem) {
  popupAddCard.renderLoading(true);
  api
    .postCard(formItem)
    .then((cardData) => {
      const card = generateCard(cardData);
      cardsSection.addItem(card);
      popupAddCard.close();
    })
    .catch((err) => console.log(`Ошибка добавления карточки. ${err}`))
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
}

const popupAddCard = new PopupWithForm({
  popup: popupAdd,
  handleFormSubmit: handlePopupAddSubmit,
});

profileAddButton.addEventListener("click", () => {
  popupAddCard.open();
  validationImage.toggleSubmitButton();
});

popupAddCard.setEventListeners();

//Функционал попапа редактирования информации
let userId;

function handlePopupInfoSubmit(data) {
  popupEditProfile.renderLoading(true);
  api
    .patchUserData(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => console.log(`Ошибка редактирования профиля. ${err}`))
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
}

const popupEditProfile = new PopupWithForm({
  popup: popupInfo,
  handleFormSubmit: handlePopupInfoSubmit,
});

const userInfo = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription,
  profileAvatar: profileAvatar,
});

const addUserInfo = () => {
  popupEditProfile.open();
  const user = userInfo.getUserInfo();
  userNameInput.value = user.profileName;
  userDescriptionInput.value = user.profileDescription;
};

profileEditButton.addEventListener("click", addUserInfo);

popupEditProfile.setEventListeners();

//Функционал открытия попапа с изображением
const popupImageFullView = new PopupWithImage(popupImage);

function handleCardClick(item) {
  popupImageFullView.open(item);
}

popupImageFullView.setEventListeners();

//Функционал попапа редактирования аватара
function handlePopupAvatarSubmit(data) {
  popupEditAvatar.renderLoading(true);
  api
    .patchAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditAvatar.close();
    })
    .catch((err) => console.log(`Ошибка редактирования аватара. ${err}`))
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}

const popupEditAvatar = new PopupWithForm({
  popup: popupAvatar,
  handleFormSubmit: handlePopupAvatarSubmit,
});

profileAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
  validationAvatarPopup.toggleSubmitButton();
});

popupEditAvatar.setEventListeners();

//Функционал попапа подтверждения удаления
const popupDeleteConfirmation = new PopupWithDelete(popupDelete);

popupDeleteConfirmation.setEventListeners();

//Добавление элементов по умолчанию
const cardsSection = new Section(
  {
    items: optionsApi,
    renderer: (item) => {
      const card = generateCard(item);
      cardsSection.addItem(card);
    },
  },
  ".elements"
);

//Создание новой карточки
function generateCard(cardData) {
  const card = new Card(
    cardData,
    ".element-template",
    (data) => handleCardClick(data),
    (card) => {
      popupDeleteConfirmation.open(card._id);
      popupDeleteConfirmation.deleteButtonEvent((id) => {
        api
          .deleteCard(id)
          .then(() => {
            card.deleteElement();
            popupDeleteConfirmation.close();
          })
          .catch((err) => console.log(`Ошибка при удалении карточки. ${err}`));
      });
    },
    userId,
    (id) => {
      api
        .putLike(id)
        .then((data) => {
          card.setLikesCounter(data.likes);
          card.addLike();
        })
        .catch((err) => console.log(`Ошибка при обновлении лайка. ${err}`));
    },
    (id) => {
      api
        .deleteLike(id)
        .then((data) => {
          card.setLikesCounter(data.likes);
          card.removeLike();
        })
        .catch((err) => console.log(`Ошибка при обновлении лайка. ${err}`));
    }
  );
  const cardElement = card.createCard();
  return cardElement;
}

//Включение валидации
const profileForm = document.forms.info;
const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();

const popupImageForm = document.forms.add;
const validationImage = new FormValidator(validationSettings, popupImageForm);
validationImage.enableValidation();

const avatarForm = document.forms.avatar;
const validationAvatarPopup = new FormValidator(validationSettings, avatarForm);
validationAvatarPopup.enableValidation();
