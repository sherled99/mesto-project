const popupEditProfile = document.querySelector('#pop-up-edit-profile');
const closePopupButton = popupEditProfile.querySelector('#pop-up-edit-profile-close');
const nameEditButton = document.querySelector('.profile__button-edit');
const popupEditForm = popupEditProfile.querySelector('.pop-up__form');
const nameForm = popupEditForm.querySelector('#name');
const hobbyForm = popupEditForm.querySelector('#description');
const profileInfo = document.querySelector('.profile__info');
const nameInfo = profileInfo.querySelector('.profile__name');
const hobbyInfo = profileInfo.querySelector('.profile__status');
const table = document.querySelector('.table');
const template = document.querySelector('#template-card').content;
const popupEditPicture = document.querySelector('#pop-up-edit-picture');
const addPictureButon = document.querySelector('.profile__button-add');
const editFormPicture = document.querySelector('#edit-form-picture');
const closePopupEditButton = document.querySelector('#pop-up-edit-picture-close');
const picture = document.querySelector('.picture');
const closePictureButton = picture.querySelector('#picture__button-close');
const nameProfile = popupEditProfile.querySelector('#name');
const descProfile = popupEditProfile.querySelector('#description');
const namePicEdit = popupEditPicture.querySelector('#name');
const descPicEdit = popupEditPicture.querySelector('#description');
const picName = picture.querySelector('#name');
const descName = picture.querySelector('#description');
const closeButtons = document.querySelectorAll('.popup__close');

function closePopup (popup, evt){
  popup.classList.remove('pop-up_opened');
}

function openPopup (popup, name, desc, evt){
  popup.classList.add('pop-up_opened');
  if (popup.classList.contains('picture')) {
    picName.src = name;
    picName.alt = desc;
    descName.textContent = desc;
  }
  else {
    if (popup.id == 'pop-up-edit-profile'){
      nameProfile.value = nameInfo.textContent;
      descProfile.value = hobbyInfo.textContent;
    }
    else{
      namePicEdit.value = name;
      descPicEdit.value = desc;
    }
  }
}

function saveProfile (evt) {
    evt.preventDefault();
    nameInfo.textContent = nameForm.value;
    hobbyInfo.textContent = hobbyForm.value;
    closePopup(popupEditProfile);
}

function setLike(evt){
    evt.target.classList.toggle('table__button-like_active');
}

function removeCard(evt){
  evt.target.parentElement.remove();
}

function addCard(name, link){
  table.prepend(createCard(name, link));
}

function setStandartCards(){
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
  initialCards.forEach(x=>{
    table.append(createCard(x.name, x.link));
  });
}

function createCard(name, link) {
  const cardElement = template.querySelector('.table__card').cloneNode(true);
  cardElement.querySelector('.table__photo').src = link;
  cardElement.querySelector('.table__photo').alt = name;
  cardElement.querySelector('.table__name').textContent = name;
  const likeButton = cardElement.querySelector('.table__button-like');
  likeButton.addEventListener('click', setLike);
  const removeButton = cardElement.querySelector('.table__button-remove');
  removeButton.addEventListener('click', removeCard);
  cardElement.querySelector('.table__photo').addEventListener('click', openPopup.bind(null,picture, link, name));
  return cardElement
}

function savePicture(evt){
  evt.preventDefault();
  addCard(editFormPicture.querySelector('#name').value, editFormPicture.querySelector('#description').value);
  closePopup(popupEditPicture, null, null);
}

function getName(){
  return nameInfo.textContent.toString();
}


closePopupButton.addEventListener('click', closePopup.bind(null, popupEditProfile, null, null));
closePopupEditButton.addEventListener('click', closePopup.bind(null, popupEditPicture, null, null));
closePictureButton.addEventListener('click', closePopup.bind(null, picture, '', ''));
nameEditButton.addEventListener('click', openPopup.bind(null, popupEditProfile, null, null));
addPictureButon.addEventListener('click', openPopup.bind(null, popupEditPicture, null, null));
popupEditForm.addEventListener('submit', saveProfile);
editFormPicture.addEventListener('submit', savePicture);
setStandartCards();
