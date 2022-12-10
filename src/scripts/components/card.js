import {table, template, picture, popupDeletePicture} from './const.js';
import {openPopup, closePopup} from './modal.js';
import {setDefaultValuesInCard, userId} from '../../index.js';
import {removeCardInDb, updateLikeInDb, addCardInDb} from './api.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openRemoveCard(evt){
  openPopup(popupDeletePicture);
  popupDeletePicture.id = evt.target.parentElement.id;
  popupDeletePicture.card = evt.target.closest(".table__card");
  popupDeletePicture.addEventListener('submit',removeCard);
}

function updateLike(method, like){
  updateLikeInDb(method, like.id)
  .then((res) => {
    like.textContent = res.likes.length;
  })
  .catch((err) => console.log(err));
}

export function addCard(card){
  addCardInDb(card)
  .then((res) =>
    table.prepend(
      createCard(
        res.owner._id,
        res._id,
        res.name,
        res.link,
        res.likes,
        res.likes.some((x) => x._id === res.owner._id)
      )
    )
  )
  .catch((err) => console.log(err));
}

function removeCard(currentEvt){
  currentEvt.preventDefault();
  const btn = currentEvt.target.querySelector('.pop-up__button-save');
  btn.textContent = "Удаление...";
  return removeCardInDb(popupDeletePicture.id)
  .then(()=> {
    popupDeletePicture.card.remove();
    closePopup(popupDeletePicture);
    popupDeletePicture.removeEventListener('submit', removeCard);
    btn.textContent = "Удалить";
  })
  .catch((err) => console.log(err));
}

function setLike(evt){
    const like = evt.target.parentElement.querySelector('.table__like');
    if (!evt.target.classList.contains('table__button-like_active')){
      updateLike("PUT", like);
    }
    else {
      updateLike("DELETE", like);
    }
    evt.target.classList.toggle('table__button-like_active');
}

export function createCard(ownerId, id, name, link, likes, isLike) {
  const cardElement = template.querySelector('.table__card').cloneNode(true);
  cardElement.id = id;
  const photo = cardElement.querySelector('.table__photo');
  const like = cardElement.querySelector('.table__like');
  photo.src = link;
  photo.alt = name;
  like.textContent = likes.length;
  like.id = id;
  cardElement.querySelector('.table__name').textContent = name;
  const likeButton = cardElement.querySelector('.table__button-like');
  if (isLike) likeButton.classList.add('table__button-like_active');
  likeButton.addEventListener('click', setLike);
  const btnDelete = cardElement.querySelector('.table__button-remove');
  btnDelete.addEventListener('click', openRemoveCard);
  if (userId === ownerId) btnDelete.classList.add('table__button-remove_active');
  photo.addEventListener('click', () => {
    openPopup(picture);
    setDefaultValuesInCard(link, name);
  });
  return cardElement
}