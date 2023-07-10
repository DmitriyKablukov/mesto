const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
let popupForm = popup.querySelector('.popup__form');
let userName = popupForm.querySelector('.popup__input_data_name');
let userDescription = popupForm.querySelector('.popup__input_data_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

const editFormToggle = function(){
    userName.value = profileName.textContent;
    userDescription.value = profileDescription.textContent;
    popup.classList.toggle('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    let profileNameValue = userName.value;
    let profileDescriptionValue = userDescription.value;
    profileName.textContent = profileNameValue;
    profileDescription.textContent = profileDescriptionValue;
    editFormToggle();
}

profileEditButton.addEventListener("click", editFormToggle);
popupCloseButton.addEventListener("click", editFormToggle);
popupForm.addEventListener('submit', handleFormSubmit);