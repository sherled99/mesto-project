import './index.css';
import {popupEditProfile, nameEditButton, popupEditForm, buttonAddPicture, nameForm, hobbyForm, nameInfo, hobbyInfo, avatarInfo, avatarForm, popupUpdateAvatar,popupEditPicture, pictureFormEdit, nameProfile,
    descProfile, namePicEdit, descPicEdit, picName, descName, pictureFormEditName, pictureFormEditDesc, cardList, formUrl, validationConfig, connection} from '../scripts/components/const.js';
import {addCard} from '../scripts/components/card.js'
import {closePopup, openPopup} from '../scripts/components/modal.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Api from "../scripts/components/Api.js"
import {createCard} from '../scripts/components/card.js';
import {renderLoading} from '../scripts/components/utils.js';
export let userId;

const api = new Api({connection});
const formValidator = new FormValidator({settings: validationConfig})

function setDefaultValuesInEditPicture(){
  namePicEdit.value = "";
  descPicEdit.value = "";
}

function setDefaultValuesInProfile(){
  nameProfile.value = nameInfo.textContent;
  descProfile.value = hobbyInfo.textContent;
}

function setDefaultValuesInAvatar(){
  formUrl.value = "";
}

export function setDefaultValuesInCard(name, desc){
  picName.src = name;
  picName.alt = desc;
  descName.textContent = desc;
}

function getProfile(){
  api.getProfile()
  .then((res) => updateProfile(res))
  .then(() => setStandartCards())
  .catch((err) => console.log(err));
}

function setStandartCards(){
  return api.getCards()
  .then((cards) => {
    cards.forEach((card) => {
      cardList.append(createCard(card.owner._id, card._id, card.name, card.link, card.likes, card.likes.some(x => x._id === card.owner._id)));
    });
  })
  .catch((err) => console.log(err));
}

function updateProfile(profile){
  nameInfo.textContent = profile.name;
  hobbyInfo.textContent = profile.about;
  avatarInfo.src = profile.avatar;
  userId = profile._id;
}
  
function saveProfile (evt) {
  evt.preventDefault();
  const btn = evt.target.querySelector('.pop-up__button-save');
  renderLoading(btn, true);
  api.saveProfile(nameForm.value, hobbyForm.value)
  .then((res) => {
    updateProfile(res);
    closePopup(popupEditProfile);
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(btn, false));
}

function savePicture(evt){
  evt.preventDefault();
  const btn = evt.target.querySelector('.pop-up__button-save');
  renderLoading(btn, true);
  addCard({
    name: pictureFormEditName.value,
    link: pictureFormEditDesc.value
  })
  .then(() => {
    closePopup(popupEditPicture);
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(btn, false));
}

function updateAvatar(evt){
  evt.preventDefault();
  const btn = evt.target.querySelector('.pop-up__button-save');
  renderLoading(btn, true);
  api.updateAvatar(formUrl.value)
  .then((res) => {
    avatarInfo.src = res.avatar;
    closePopup(popupUpdateAvatar);
    setDefaultValuesInAvatar();
    renderLoading(btn, false);
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(btn, false));
}

formValidator.enableValidation();
getProfile();


nameEditButton.addEventListener('click', () => {
  setDefaultValuesInProfile();
  formValidator.clearInputError(popupEditForm);
  openPopup(popupEditProfile);
});
buttonAddPicture.addEventListener('click', () => {
  setDefaultValuesInEditPicture();
  formValidator.clearInputError(pictureFormEdit);
  openPopup(popupEditPicture);
});
avatarInfo.addEventListener('click', () => {
  setDefaultValuesInAvatar();
  formValidator.clearInputError(avatarForm);
  openPopup(popupUpdateAvatar);
});
popupEditForm.addEventListener('submit', saveProfile);
pictureFormEdit.addEventListener('submit', savePicture);
avatarForm.addEventListener('submit', updateAvatar);
