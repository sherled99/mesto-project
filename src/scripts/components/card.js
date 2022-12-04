import {table, template, picture} from './const.js';
import {openPopup} from './modal.js';
import {setDefaultValuesInCard} from '../../index.js';

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

function removeCard(evt){
  evt.target.closest('.table__card').remove();
}

export function setStandartCards(){
  initialCards.forEach(card=>{
    table.append(createCard(card.name, card.link));
  });
}

function setLike(evt){
    evt.target.classList.toggle('table__button-like_active');
}

export function createCard(name, link) {
  const cardElement = template.querySelector('.table__card').cloneNode(true);
  const photo = cardElement.querySelector('.table__photo');
  photo.src = link;
  photo.alt = name;
  cardElement.querySelector('.table__name').textContent = name;
  const likeButton = cardElement.querySelector('.table__button-like');
  likeButton.addEventListener('click', setLike);
  const removeButton = cardElement.querySelector('.table__button-remove');
  removeButton.addEventListener('click', removeCard);
  photo.addEventListener('click', () => {
    openPopup(picture);
    setDefaultValuesInCard(link, name);
  });
  return cardElement
}

export function addCard(name, link){
    table.prepend(createCard(name, link));
}