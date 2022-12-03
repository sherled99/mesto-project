import {popupEditProfile, closePopupButton, nameEditButton, popupEditForm, nameForm, hobbyForm, nameInfo, hobbyInfo,
    popupEditPicture, addPictureButon, editFormPicture, closePopupEditButton, picture, closePictureButton, nameProfile,
    descProfile, namePicEdit, descPicEdit, picName, descName, editFormPictureName, editFormPictureDesc, table} from './const.js';

import {createCard, addCard} from './card.js';

import {enableValidation} from './validate.js';

function closePopup (popup){
    popup.classList.remove('pop-up_opened');
    document.removeEventListener('click', closePopupByEsc);
    document.removeEventListener('keydown', closePopupByEsc);
  }
  
export function openPopup (popup){
  popup.classList.add('pop-up_opened');
  document.addEventListener('click', closePopupByEsc);
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt){
  if (evt.target.classList.contains("pop-up") || evt.key === 'Escape') {
    closePopup(popupEditProfile);
    closePopup(popupEditPicture);
    closePopup(picture);
  }
}
export function setDefaultValues(popup, name, desc){
  if (popup.classList.contains('picture')) {
    picName.src = name;
    picName.alt = desc;
    descName.textContent = desc;
  }
  else {
    if (popup.id === 'pop-up-edit-profile'){
      nameProfile.value = nameInfo.textContent;
      descProfile.value = hobbyInfo.textContent;
      enableValidation();
    }
    else{
      if (name){
        namePicEdit.value = name;
        descPicEdit.value = desc;
      } else {
        namePicEdit.value = "";
        descPicEdit.value = "";
      }
      enableValidation();
    }
  }
}

function saveProfile (evt) {
    evt.preventDefault();
    nameInfo.textContent = nameForm.value;
    hobbyInfo.textContent = hobbyForm.value;
    closePopup(popupEditProfile);
}
function savePicture(evt){
  evt.preventDefault();
  addCard(editFormPictureName.value, editFormPictureDesc.value);
  closePopup(popupEditPicture, null, null);
}

closePopupButton.addEventListener('click', () => closePopup(popupEditProfile));
closePopupEditButton.addEventListener('click', () => closePopup(popupEditPicture));
closePictureButton.addEventListener('click', () => closePopup(picture));
nameEditButton.addEventListener('click', () => openPopup(popupEditProfile));
nameEditButton.addEventListener('click', () => setDefaultValues(popupEditProfile));
addPictureButon.addEventListener('click', () => openPopup(popupEditPicture));
addPictureButon.addEventListener('click', () => setDefaultValues(popupEditPicture));
popupEditForm.addEventListener('submit', saveProfile);
editFormPicture.addEventListener('submit', savePicture);