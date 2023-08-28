import {
  openPopup,
  popupImage,
  popupImagePlaceName,
  popupImagePicture,
} from "./index.js";

class Card {
  constructor(cardData, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = cardData.name;
    this._link = cardData.link;
  }
  //Создание template элемента
  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return template;
  }
  //Добавление данных в template элемент
  _setInfo() {
    const elementPlaceName = this._newCard.querySelector(
      ".element__place-name"
    );
    elementPlaceName.textContent = this._name;
    this._elementImage = this._newCard.querySelector(".element__image");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
  }
  //Удаление элемента
  _deleteElement() {
    this._newCard.remove();
    this._newCard = null;
  }
  //Лайк элемента
  _handleLikeClick() {
    this._likeButton.classList.toggle("element__like-button_active");
  }
  //Открытие изображения
  _openImage() {
    openPopup(popupImage);
    popupImagePicture.src = this._link;
    popupImagePicture.alt = this._name;
    popupImagePlaceName.textContent = this._name;
  }
  //Слушатели удаления, лайка, открытия
  _setEventListeners() {
    const deleteButton = this._newCard.querySelector(".element__delete-button");
    deleteButton.addEventListener("click", this._deleteElement.bind(this));
    this._likeButton = this._newCard.querySelector(".element__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._elementImage.addEventListener("click", () => {
      this._openImage();
    });
  }
  //Создание новой карточки
  createCard() {
    this._newCard = this._getTemplate();
    this._setInfo();
    this._setEventListeners();
    return this._newCard;
  }
}

export default Card;
