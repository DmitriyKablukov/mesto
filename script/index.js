
const editForm = document.querySelector('.popup');
const editButtonOpen = document.querySelector('.profile__edit-button');
const editButtonClose = editForm.querySelector('.popup__close-button');
let editFormPlace = editForm.querySelector('.popup__form');
let editFormName = editFormPlace.querySelector('.popup__input_data_name');
let editFormDescription = editFormPlace.querySelector('.popup__input_data_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

const editFormToggle = function(){
    editForm.classList.toggle('popup_opened');
    editFormName.value = profileName.textContent;
    editFormDescription.value = profileDescription.textContent;
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    let profileNameValue = editFormName.value;
    let profileDescriptionValue = editFormDescription.value;
    profileName.textContent = profileNameValue;
    profileDescription.textContent = profileDescriptionValue;
    editFormToggle();
}

editButtonOpen.addEventListener("click", editFormToggle);
editButtonClose.addEventListener("click", editFormToggle);
editFormPlace.addEventListener('submit', handleFormSubmit);


