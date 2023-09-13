import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector(".popup__image-picture");
    this._placeName = this._popup.querySelector(".popup__image-place-name");
  }
  //Открытие изображения
  open({ link, name }) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._placeName.textContent = name;
  }
}

export default PopupWithImage;
