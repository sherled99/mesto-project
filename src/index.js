import './pages/index.css';
import {popupEditProfile, nameEditButton, popupEditForm, buttonAddPicture, nameForm, hobbyForm, nameInfo, hobbyInfo, avatarInfo, avatarForm, popupUpdateAvatar,popupEditPicture, pictureFormEdit, nameProfile,
    descProfile, namePicEdit, descPicEdit, picName, descName, pictureFormEditName, pictureFormEditDesc, connectHeaders, table} from './scripts/components/const.js';
import {enableValidation} from './scripts/components/validate.js'
import {addCard} from './scripts/components/card.js'
import {closePopup, openPopup} from './scripts/components/modal.js'
import {getCardsInDb, getProfileInDb, saveProfileInDb, updateAvatarInDb} from './scripts/components/api.js';
import {createCard} from './scripts/components/card.js'

export let userId;

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

function getProfile(){
  getProfileInDb()
  .then((res) => updateProfile(res))
  .then(() => setStandartCards())
  .catch((err) => console.log(err));
}

function setStandartCards(){
  return getCardsInDb()
  .then((cards) => {
    cards.forEach((card) => {
      table.append(createCard(card.owner._id, card._id, card.name, card.link, card.likes, card.likes.some(x => x._id === card.owner._id)));
    });
  })
  .catch((err) => console.log(err));
}

export function updateProfile(profile){
  nameInfo.textContent = profile.name;
  hobbyInfo.textContent = profile.about;
  avatarInfo.src = profile.avatar;
  userId = profile._id;
  return Promise.resolve();
}
  
function saveProfile (evt) {
  evt.preventDefault();
  saveProfileInDb(nameForm.value, hobbyForm.value)
  .then((res) => {
    updateProfile(res);
    closePopup(popupEditProfile);
  })
  .catch((err) => console.log(err));
}

function savePicture(evt){
  evt.preventDefault();
  addCard({
    name: pictureFormEditName.value,
    link: pictureFormEditDesc.value
  });
  closePopup(popupEditPicture);
}

function updateAvatar(evt){
  evt.preventDefault();
  updateAvatarInDb(avatarForm.querySelector('#url').value)
  .then((res) => {
    avatarInfo.src = res.avatar;
  })
  .catch((err) => console.log(err));

  closePopup(popupUpdateAvatar);
}

enableValidation({
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__text',
  submitButtonSelector: '.pop-up__button-save',
  inputInvalid: 'pop-up__text_invalid',
  inactiveButtonClass: 'pop-up__button_save_type-inactive',
  errorClass: 'pop-up__text-error'
});
getProfile();


nameEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  setDefaultValuesInProfile()
});
buttonAddPicture.addEventListener('click', () => {
  openPopup(popupEditPicture);
  setDefaultValuesInEditPicture()
});
avatarInfo.addEventListener('click', () => {
  openPopup(popupUpdateAvatar);
});
popupEditForm.addEventListener('submit', saveProfile);
pictureFormEdit.addEventListener('submit', savePicture);
avatarForm.addEventListener('submit', updateAvatar);
