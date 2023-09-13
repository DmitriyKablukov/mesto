class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //Открытие модального окна
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //Закрытие модального окна
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  //Закрытие модального окна по нажатию клавиши Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  //Слушатель клика иконке закрытия попапа и клика на оверлей
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup__close-button") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
