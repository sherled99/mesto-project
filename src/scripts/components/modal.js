import {popupEditProfile, popupEditProfileIsClose, nameEditButton, popupEditPicture, buttonAddPicture, 
  closePopupEditButton, picture, closePictureButton} from './const.js';
import {setDefaultValuesInEditPicture, setDefaultValuesInProfile} from '../../index.js';

export function closePopup (popup){
    popup.classList.remove('pop-up_opened');
    popup.removeEventListener('mousedown', closePopupByClick);
    document.removeEventListener('keydown', closePopupByEsc);
  }
  
export function openPopup (popup){
  popup.classList.add('pop-up_opened');
  popup.addEventListener('mousedown', (evt) => closePopupByClick(evt,popup));
  document.addEventListener('keydown', (evt) => closePopupByEsc(evt, popup));
}

function closePopupByEsc(evt, popup){
  if (evt.key === 'Escape') closePopup(popup);
}

function closePopupByClick(evt, popup){
  if(evt.target.classList.contains("pop-up")) closePopup(popup);
}

popupEditProfileIsClose.addEventListener('click', () => closePopup(popupEditProfile));
closePopupEditButton.addEventListener('click', () => closePopup(popupEditPicture));
closePictureButton.addEventListener('click', () => closePopup(picture));
nameEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  setDefaultValuesInProfile()
});
buttonAddPicture.addEventListener('click', () => {
  openPopup(popupEditPicture);
  setDefaultValuesInEditPicture()
});