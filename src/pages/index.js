import './index.css';
import {nameEditButton, popupEditForm, buttonAddPicture,nameInfo, hobbyInfo, avatarInfo, avatarForm, pictureFormEdit, cardList, validationConfig, connection} from '../scripts/components/const.js';
import FormValidator from '../scripts/components/FormValidator.js'
import Api from "../scripts/components/Api.js"
import Card from '../scripts/components/Card.js';
import Render from '../scripts/components/Render.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithoutForm from '../scripts/components/PopupWithoutForm';
import UserInfo from '../scripts/components/UserInfo';
import Section from '../scripts/components/Section';


const section = new Section('.table');

const userInfo = new UserInfo(
  {
    data: {
      selectorPorfile: '.profile',
      selectorName: '.profile__name',
      selectorStatus: '.profile__status',
      selectorAvatar: '.profile__avatar'},
    getProfile: () => {
      return api.getProfile();
    },
    setStandartCards: (userId) => {
      setStandartCards(userId);
    }
  }
);



const api = new Api({connection});
const render = new Render();
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

function setStandartCards(userId){
  return api.getCards()
  .then((cards) => {
    cards.forEach((res) => {
      const card = new Card({data: res, handleClick: (photo) => {
        photo.addEventListener('click', () => {
          const popupWithImage = new PopupWithImage(`.picture`, '#name', '#description');
          popupWithImage.open(res.link, res.name);
        });
      }, openRemoveCard: (evt) => {
        const popupWithoutForm = new PopupWithoutForm({renderDelete: (btn, status) => {
          render.renderDeleting(btn, status)
        }, deleteCard: (id) => {
          return api.removeCard(id);
        }}, '.pop-up-delete-picture');
        popupWithoutForm.open(evt);
      }, updateLike: (method, like) => {
        api.updateLike(method, like.id)
        .then((res) => {
          like.textContent = res.likes.length;
        })
        .catch((err) => console.log(err));
      }}, '.table__card', userId);
      const cardElement = card.createCard();
      section.addItem(cardElement);
    });
  })
  .catch((err) => console.log(err));
}
  
function saveProfile (evt, name, description) {
  evt.preventDefault();
  const btn = evt.target.querySelector('.pop-up__button-save');
  render.renderLoading(btn, true);
  api.saveProfile(name, description)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupProfile.close(nameInfo.textContent, hobbyInfo.textContent);
  })
  .catch((err) => console.log(err))
  .finally(() => render.renderLoading(btn, false));
}

function savePicture(evt, name, description){
  evt.preventDefault();
  const btn = evt.target.querySelector('.pop-up__button-save');
  render.renderLoading(btn, true);
  api.addCard({
    name: name,
    link: description
  })
  .then((res) => {
    const card = new Card({data: res, handleClick: (photo) => {
      photo.addEventListener('click', () => {
        const popupWithImage = new PopupWithImage(`.picture`, '#name', '#description');
        popupWithImage.open(res.link, res.name);
      });
    }, openRemoveCard: (evt) => {
      const popupWithoutForm = new PopupWithoutForm({renderDelete: (btn, status) => {
        render.renderDeleting(btn, status)
      }, deleteCard: (id) => {
        return api.removeCard(id);
      }, updateLike: (method, like) => {
        api.updateLike(method, like.id)
        .then((res) => {
          like.textContent = res.likes.length;
        })
        .catch((err) => console.log(err));
      }}, '.pop-up-delete-picture');
      popupWithoutForm.open(evt);
    }, updateLike: (method, like) => {
      api.updateLike(method, like.id)
      .then((res) => {
        like.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
    }}, '.table__card', res.owner._id);
    const cardElement = card.createCard();
    cardList.prepend(cardElement);
  })
  .then(() => {
    popupNewPicture.close("", "");
  })
  .catch((err) => console.log(err))
  .finally(() => render.renderLoading(btn, false));
}


function updateAvatar(evt, name){
  evt.preventDefault();
  const btn = evt.target.querySelector('.pop-up__button-save');
  render.renderLoading(btn, true);
  api.updateAvatar(name)
  .then((res) => {
    avatarInfo.src = res.avatar;
    popupAvatar.close();
    render.renderLoading(btn, false);
  })
  .catch((err) => console.log(err))
  .finally(() => render.renderLoading(btn, false));
}

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
formValidator.enableValidation();
userInfo.getUserInfo();
