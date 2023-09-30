class Card {
  constructor(
    cardData,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    userId,
    handleLikeClick,
    handleDeleteLikeIcon
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteLikeIcon = handleDeleteLikeIcon;
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
    this._likeButton = this._newCard.querySelector(".element__like-button");
    this._likeCounter = this._newCard.querySelector(".element__like-counter");
    this._likeCounter.textContent = this._likes.length;
  }
  //Удаление элемента
  deleteElement() {
    this._newCard.remove();
    this._newCard = null;
  }
  _deleteButtonCheck() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
  }
  _handleDeleteButton() {
    this.handleDeleteClick(this);
  }
  //Лайк элемента
  addLike() {
    this._likeButton.classList.add("element__like-button_active");
  }
  removeLike() {
    this._likeButton.classList.remove("element__like-button_active");
  }
  setLikesCounter(likes) {
    this._likeCounter.textContent = likes.length;
  }
  _likeActive() {
    return this._likes.some((cardData) => {
      return cardData._id === this._userId;
    });
  }
  _setLikeButton() {
    if (this._likeActive()) {
      this._likeButton.classList.add("element__like-button_active");
    }
  }
  _handleLikeClick() {
    if (this._likeButton.classList.contains("element__like-button_active")) {
      this.handleDeleteLikeIcon(this._id);
    } else {
      this.handleLikeClick(this._id);
    }
  }
  //Установка слушателей
  _setEventListeners() {
    this._deleteButton = this._newCard.querySelector(".element__delete-button");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._elementImage.addEventListener("click", () => {
      this.handleCardClick({ name: this._name, link: this._link });
    });
  }
  //Создание новой карточки
  createCard() {
    this._newCard = this._getTemplate();
    this._setInfo();
    this._setEventListeners();
    this._setLikeButton();
    this._deleteButtonCheck();
    return this._newCard;
  }
}

export default Card;
