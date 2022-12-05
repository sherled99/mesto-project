import './pages/index.css';
import {popupEditProfile, nameEditButton, popupEditForm, buttonAddPicture, nameForm, hobbyForm, nameInfo, hobbyInfo, popupEditPicture, pictureFormEdit, nameProfile,
    descProfile, namePicEdit, descPicEdit, picName, descName, pictureFormEditName, pictureFormEditDesc} from './scripts/components/const.js';
import {enableValidation} from './scripts/components/validate.js'
import {setStandartCards, addCard} from './scripts/components/card.js'
import {closePopup, openPopup} from './scripts/components/modal.js'

export function setDefaultValuesInEditPicture(){
  namePicEdit.value = "";
  descPicEdit.value = "";
}

export function setDefaultValuesInProfile(){
  nameProfile.value = nameInfo.textContent;
  descProfile.value = hobbyInfo.textContent;
}

export function setDefaultValuesInCard(name, desc){
  picName.src = name;
  picName.alt = desc;
  descName.textContent = desc;
}
  
function saveProfile (evt) {
      evt.preventDefault();
      nameInfo.textContent = nameForm.value;
      hobbyInfo.textContent = hobbyForm.value;
      closePopup(popupEditProfile);
  }
function savePicture(evt){
    evt.preventDefault();
    addCard(pictureFormEditName.value, pictureFormEditDesc.value);
    closePopup(popupEditPicture);
  }

setStandartCards();
enableValidation({
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__text',
  submitButtonSelector: '.pop-up__button-save',
  inactiveButtonClass: 'pop-up__button_save_type-inactive',
  errorClass: 'pop-up__text-error'
}); 


nameEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  setDefaultValuesInProfile()
});
buttonAddPicture.addEventListener('click', () => {
  openPopup(popupEditPicture);
  setDefaultValuesInEditPicture()
});
popupEditForm.addEventListener('submit', saveProfile);
pictureFormEdit.addEventListener('submit', savePicture);
