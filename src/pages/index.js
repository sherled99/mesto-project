import './index.css';
import {nameEditButton, buttonAddPicture, avatarInfo, cardList, validationConfig, connection} from '../scripts/utils/const.js';
import FormValidator from '../scripts/components/FormValidator.js'
import Api from "../scripts/components/Api.js"
import Card from '../scripts/components/Card.js';
import Render from '../scripts/components/Render.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithoutForm from '../scripts/components/PopupWithoutForm';
import UserInfo from '../scripts/components/UserInfo';
import Section from '../scripts/components/Section';


const render = new Render();
const porfileValidator = new FormValidator({settings: validationConfig}, '#edit-form-profile');
const cardValidator = new FormValidator({settings: validationConfig}, '#edit-form-picture');
const avatarValidator = new FormValidator({settings: validationConfig}, '#edit-form-avatar');
const section = new Section('.table');

const api = new Api({connection});
const standartUserData = api.getProfile();
const standartCards = api.getCards();


const userInfo = new UserInfo(
  {
    data: {
      selectorPorfile: '.profile',
      selectorName: '.profile__name',
      selectorStatus: '.profile__status',
      selectorAvatar: '.profile__avatar'
    }
  }
);

const setStandartCards = (cards, userId) => {
  return cards.forEach((res) => {
      const card = new Card({data: res, handleClick: (photo) => {
        photo.addEventListener('click', () => {
          const popupWithImage = new PopupWithImage(`.picture`, '#name', '#description');
          popupWithImage.open(res.link, res.name);
        });
      }, openRemoveCard: (evt) => {
        const popupWithoutForm = new PopupWithoutForm({renderDelete: (btn, status) => {
          render.renderDeleting(btn, status)
        }, deleteCard: (id) => {
          return api.removeCard(id)
            .catch((err) => console.log(err));
        }}, '.pop-up-delete-picture');
        popupWithoutForm.open(evt);
      }, updateLike: (method, like) => {
        return api.updateLike(method, like.id)
          .catch((err) => console.log(err));
      }}, '.table__card', userId);
      const cardElement = card.createCard();
      section.addItem(cardElement);
    });
}

Promise.all([standartUserData, standartCards])
  .then((values) => {
    setStandartCards(values[1], values[0]._id);
    userInfo.setUserInfo(values[0]);
    
    const popupProfile = new PopupWithForm(
      {
        data: userInfo.getUserInfo(),
        submit: (values, evt) => {
          saveProfile(evt, values.name, values.description);
        }
      }, '#pop-up-edit-profile');
    
    const popupNewPicture = new PopupWithForm(
      {
        data: {
          name: "",
          desc: ""
        },
        submit: (values, evt) => {
          savePicture(evt, values.name, values.description);
        }
      }, "#pop-up-edit-picture");
    
    const popupAvatar = new PopupWithForm(
      {
        data: {
          name: "",
          desc: ""
        },
        submit: (values, evt) => {
          updateAvatar(evt, values.name);
        }
      }, '#pop-up-edit-avatar');
      
    const saveProfile = (evt, name, description) => {
      evt.preventDefault();
      const btn = evt.target.querySelector('.pop-up__button-save');
      render.renderLoading(btn, true);
      api.saveProfile(name, description)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupProfile.close();
        popupProfile.refreshValues(res.name, res.about);
      })
      .catch((err) => console.log(err))
      .finally(() => render.renderLoading(btn, false));
    }
    
    const savePicture = (evt, name, description) => {
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
            return api.removeCard(id)
              .catch((err) => console.log(err));
            
          }, updateLike: (method, like) => {
            return api.updateLike(method, like.id)
              .catch((err) => console.log(err));
          }}, '#pop-up-delete-picture');
          popupWithoutForm.open(evt);
        }, updateLike: (method, like) => {
          return api.updateLike(method, like.id)
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
    
    
    const updateAvatar = (evt, name) => {
      evt.preventDefault();
      const btn = evt.target.querySelector('.pop-up__button-save');
      render.renderLoading(btn, true);
      api.updateAvatar(name)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupAvatar.close();
        render.renderLoading(btn, false);
      })
      .catch((err) => console.log(err))
      .finally(() => render.renderLoading(btn, false));
    }
    
    nameEditButton.addEventListener('click', () => {
      porfileValidator.enableValidation();
      popupProfile.open();
    });
    buttonAddPicture.addEventListener('click', () => {
      cardValidator.enableValidation();
      popupNewPicture.open();
    });
    avatarInfo.addEventListener('click', () => {
      avatarValidator.enableValidation();
      popupAvatar.open();
    });
  });