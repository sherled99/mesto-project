import './index.css';
import {nameEditButton, popupEditForm, buttonAddPicture,nameInfo, hobbyInfo, avatarInfo, avatarForm, pictureFormEdit, cardList, validationConfig, connection} from '../scripts/components/const.js';
import FormValidator from '../scripts/components/FormValidator.js'
import Api from "../scripts/components/Api.js"
import Card from '../scripts/components/Card.js';
import {renderLoading} from '../scripts/components/utils.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithoutForm from '../scripts/components/PopupWithoutForm';
export let userId;

const api = new Api({connection});
const formValidator = new FormValidator({settings: validationConfig})
const popupProfile = new PopupWithForm(
  {
    data: {selector:'#pop-up-edit-profile',
          name: '#name',
          description: "#description"},
    submit: (evt) => {
      const {name, description} = popupProfile.getInputValues();
      saveProfile(evt, name, description);
    }
  });

const popupNewPicture = new PopupWithForm(
  {
    data: {selector:'#pop-up-edit-picture',
          name: '#name',
          description: "#description"},
    submit: (evt) => {
      const {name, description} = popupNewPicture.getInputValues();
      savePicture(evt, name, description);
    }
  });

const popupAvatar = new PopupWithForm(
  {
    data: {selector:'#pop-up-edit-avatar',
          name: '#url'},
    submit: (evt) => {
      const {name} = popupAvatar.getInputValues();
      updateAvatar(evt, name);
    }
  });

function getProfile(){
  api.getProfile()
  .then((res) => updateProfile(res))
  .then(() => setStandartCards())
  .catch((err) => console.log(err));
}

function setStandartCards(){
  return api.getCards()
  .then((cards) => {
    cards.forEach((res) => {
      const card = new Card({data: res, handleClick: (photo) => {
        photo.addEventListener('click', () => {
          const popupWithImage = new PopupWithImage(`.picture`, '#name', '#description');
          popupWithImage.open(res.link, res.name);
        });
      }, openRemoveCard: (evt) => {
        const popupWithoutForm = new PopupWithoutForm('#pop-up-delete-picture', '#pop-up-delete-picture');
        popupWithoutForm.open(evt);
      }}, '.table__card');
      const cardElement = card.createCard();
      cardList.append(cardElement);
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
  
function saveProfile (evt, name, description) {
  evt.preventDefault();
  const btn = evt.target.querySelector('.pop-up__button-save');
  renderLoading(btn, true);
  api.saveProfile(name, description)
  .then((res) => {
    updateProfile(res);
    popupProfile.close(nameInfo.textContent, hobbyInfo.textContent);
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(btn, false));
}

function savePicture(evt, name, description){
  evt.preventDefault();
  const btn = evt.target.querySelector('.pop-up__button-save');
  renderLoading(btn, true);
  const card = new Card("", ".template-card");
  card.addCard({
    name: name,
    link: description
  })
  .then(() => {
    popupNewPicture.close("", "");
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(btn, false));
}


function updateAvatar(evt, name){
  evt.preventDefault();
  const btn = evt.target.querySelector('.pop-up__button-save');
  renderLoading(btn, true);
  api.updateAvatar(name)
  .then((res) => {
    avatarInfo.src = res.avatar;
    popupAvatar.close();
    renderLoading(btn, false);
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(btn, false));
}

formValidator.enableValidation();
getProfile();


nameEditButton.addEventListener('click', () => {
  popupProfile.clearValues(nameInfo.textContent, hobbyInfo.textContent);
  formValidator.clearInputError(popupEditForm);
  popupProfile.open();
});
buttonAddPicture.addEventListener('click', () => {
  popupNewPicture.clearValues("", "");
  formValidator.clearInputError(pictureFormEdit);
  popupNewPicture.open();
});
avatarInfo.addEventListener('click', () => {
  popupAvatar.clearValues("");
  formValidator.clearInputError(avatarForm);
  popupAvatar.open();
});
