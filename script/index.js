//Набор карточек по умолчанию
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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
const placeImage = elements.querySelector('.element__image');
const popupCloseButtonImage = popupImage.querySelector('.popup__close-button_image');
const popupImagePicture = popupImage.querySelector('.popup__image-picture');
const popupImagePlaceName = popupImage.querySelector('.popup__image-place-name');
//Функция открытия модального окна
function openPopup(item) {
  item.classList.add('popup_opened');
};
//Функция закрытия модального окна
function closePopup(item){
  item.classList.remove('popup_opened');
};
//Функция добавления информации при открытии popupInfo
const editFormToggle = function(){
    userName.value = profileName.textContent;
    userDescription.value = profileDescription.textContent;
    openPopup(popupInfo);
}
//Слушатель открытия popupInfo
profileEditButton.addEventListener('click', editFormToggle);
//Слушатель закрытия popupInfo
popupCloseButtonInfo.addEventListener('click', function() {
  closePopup(popupInfo);
});
//Функция отправки данных popupInfo
function handleFormEditSubmit (evt) {
    evt.preventDefault();
    const profileNameValue = userName.value;
    const profileDescriptionValue = userDescription.value;
    profileName.textContent = profileNameValue;
    profileDescription.textContent = profileDescriptionValue;
    closePopup(popupInfo);
}
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
//Функция лайка элемента
function clickLikeButton (evt) {
    if (evt.target.classList == 'element__like-button') {
        evt.target.classList.add('element__like-button_active');
    }
    else {evt.target.classList.remove('element__like-button_active');}
  };
//Функция добавления элементов по умолчанию
initialCards.forEach( item => {
  const placeElement = createElementTemplate(item);
  elements.append(placeElement);
});
//Функция добавления элементов по умолчанию
function createElementTemplate (data) {
  const placeElement = elementTemplate.content.cloneNode(true);
  const elementPlaceName = placeElement.querySelector('.element__place-name');
  const elementImage = placeElement.querySelector('.element__image');
  elementPlaceName.textContent = data.name;
  elementImage.src= data.link;
  elementImage.alt= data.name;
  const deleteButton = placeElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', deleteElement);
//Функия открытия изображения
  elementImage.addEventListener('click', () => {
      openPopup(popupImage);      
      popupImagePlaceName.textContent = data.name,
      popupImagePicture.src = data.link,
      popupImagePicture.alt = data.name
    });
    elements.addEventListener('click', clickLikeButton);
  return placeElement;
};
//Слушатель закрытия popupImage
popupCloseButtonImage.addEventListener('click', function() {
  closePopup(popupImage);
});
//Функция добавления нового элемента
function createNewElement (evt) {
  evt.preventDefault();
  const newElement = createElementTemplate({name: placeName.value, link: placeLink.value});
  placeName.value = '';
  placeLink.value = '';
  elements.prepend(newElement);
  closePopup(popupAdd);
}
//Слушатель события отправки popupAdd
popupFormAdd.addEventListener('submit', createNewElement);
//Функция удаления элемента
function deleteElement (e) {
  const el = e.target.closest('.element');
  el.remove();
};

