const editForm = document.querySelector('.edit-form');
const editButtonOpen = document.querySelector('.profile__edit-button-open');
const editButtonClose = editForm.querySelector('.edit-form__close-button');
let editFormPlace = editForm.querySelector('.edit-form__place');
let editFormName = editFormPlace.querySelector('.edit-form__name');
let editFormDescription = editFormPlace.querySelector('.edit-form__description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const editFormToggle = function(){
    editForm.classList.toggle('edit-form-active');
}
editButtonOpen.addEventListener("click", editFormToggle);
editButtonClose.addEventListener("click", editFormToggle);
function handleFormSubmit (evt) {
    evt.preventDefault();
    let profileNameValue = editFormName.value;
    let profileDescriptionValue = editFormDescription.value;
    profileName.textContent = profileNameValue;
    profileDescription.textContent = profileDescriptionValue;
}
editFormPlace.addEventListener('submit', handleFormSubmit);
editFormPlace.addEventListener('submit', editFormToggle);

