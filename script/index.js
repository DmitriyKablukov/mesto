import { initialCards } from "./elements.js";
import Card from "./card.js";
//import FormValidator from "./FormValidator.js";


//Объявление переменных для popupInfo
const popupInfo = document.querySelector('.popup_info');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButtonInfo = popupInfo.querySelector('.popup__close-button_info');
const popupFormInfo = popupInfo.querySelector('.popup__form_info');
const userName = popupFormInfo.querySelector('.popup__input_data_name');
const userDescription = popupFormInfo.querySelector('.popup__input_data_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//Объявление переменных для popupAdd
const popupAdd = document.querySelector('.popup_add');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtonAdd = popupAdd.querySelector('.popup__close-button_add');
const popupFormAdd = popupAdd.querySelector('.popup__form_add');
const placeName = popupFormAdd.querySelector('.popup__input_data_place');
const placeLink = popupFormAdd.querySelector('.popup__input_data_link');
//Объявление переменных для template элемента
const elementTemplate = document.querySelector('.element-template');
const elements = document.querySelector('.elements');
const element = elementTemplate.querySelector('.element');
//Объявление переменных для popupImage
const popupImage = document.querySelector('.popup_image');
const popupCloseButtonImage = popupImage.querySelector('.popup__close-button_image');

//Функция открытия модального окна
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};
//Функция закрытия модального окна
function closePopup(item){
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};
//Функция закрытия модального окна по нажатию клавиши Esc
function closePopupEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if(evt.key === 'Escape') {
    closePopup(popupOpened);
  }
};
//Функция закрытия модального окна по нажатию на оверлей
function closePopupOverlay (evt) {
  if (evt.target === evt.currentTarget) closePopup(evt.currentTarget);
};
//Слушатель клика на оверлей
document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('mousedown', closePopupOverlay);
});
//Слушатель закрытия popupImage
popupCloseButtonImage.addEventListener('click', function() {
  closePopup(popupImage);
});
//Функция добавления информации при открытии popupInfo
const editFormToggle = function(){
  userName.value = profileName.textContent;
  userDescription.value = profileDescription.textContent;
  openPopup(popupInfo);
}
//Функция отправки данных popupInfo
function handleFormEditSubmit (evt) {
  evt.preventDefault();
  const profileNameValue = userName.value;
  const profileDescriptionValue = userDescription.value;
  profileName.textContent = profileNameValue;
  profileDescription.textContent = profileDescriptionValue;
  closePopup(popupInfo);
}
//Слушатель открытия popupInfo
profileEditButton.addEventListener('click', editFormToggle);
//Слушатель закрытия popupInfo
popupCloseButtonInfo.addEventListener('click', function() {
  closePopup(popupInfo);
});
//Слушатель отправки данных popupInfo
popupFormInfo.addEventListener('submit', handleFormEditSubmit);
//Слушатель открытия popupAdd
profileAddButton.addEventListener('click', function() {
  openPopup(popupAdd);
});
//Слушатель закрытия popupAdd
popupCloseButtonAdd.addEventListener('click', function() {
  closePopup(popupAdd);
});
//Добавление элементов по умолчанию
initialCards.forEach((item) => {
  const card = new Card(item,'.element-template');//ЧТО ЗА ЭЛЕМЕНТ ПО УМОЛЧАНИЮ
  elements.append(card.createCard());
});
//Функция добавления нового элемента
function createNewElement (evt) {
  evt.preventDefault();
  const newElement = new Card({name: placeName.value, link: placeLink.value});
  placeName.value = '';
  placeLink.value = '';
  //disableButton(evt.submitter);//ПОЧИНИТЬ КНОПКУ БЛОКИРОВКИ
  elements.prepend(newElement.createCard());
  closePopup(popupAdd);
}
//Слушатель события отправки popupAdd
popupFormAdd.addEventListener('submit', createNewElement);

//НЕОБХОДИМО ОТРЕДАКТИРОВАТЬ ИМПОРТЫ
//export {openPopup, closePopup, closePopupEsc, closePopupOverlay, popupImage}
export {openPopup, popupImage}