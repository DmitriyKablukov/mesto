import { openPopup, popupImage } from "./index.js";

class Card {
  constructor(element, templateSelector) {
    this._templateSelector = templateSelector;
    this._newCard = this._newTemplate();
    this._name = element.name;
    this._link = element.link;
  }
//Создание template элемента
  _newTemplate() {
    const template = document
      .querySelector(".element-template")
      .content
      .querySelector(".element")
      .cloneNode(true);
    return template;
  }
//Добавление данных в template элемент
  _setInfo() {
    const elementPlaceName = this._newCard.querySelector(".element__place-name");
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
  _clickLikeButton() {
    this._likeButton.classList.toggle('element__like-button_active');
  }
//Открытие изображения
  _openImage() {
    const popupImagePlaceName = popupImage.querySelector(".popup__image-place-name");
    const popupImagePicture = popupImage.querySelector(".popup__image-picture");
    openPopup(popupImage);
    popupImagePicture.src = this._link;
    popupImagePlaceName.alt = this._name;
    popupImagePlaceName.textContent = this._name;
  }
//Слушатели удаления, лайка, открытия
  _setEventListeners() {
    const deleteButton = this._newCard.querySelector(".element__delete-button");
    deleteButton.addEventListener("click", this._deleteElement.bind(this));
    this._likeButton = this._newCard.querySelector(".element__like-button");
    this._likeButton.addEventListener("click", () => {
      this._clickLikeButton();
    });
    this._elementImage.addEventListener("click", () => {
      this._openImage();
     });
  }
//Создание новой карточки
  createCard() {
    this._newCard = this._newTemplate();
    this._setInfo();
    this._setEventListeners();
    return this._newCard;
  }
}

export default Card;