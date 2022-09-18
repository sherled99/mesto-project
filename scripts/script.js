const popupEditProfile = document.querySelector('#pop-up-edit-profile');
const closePopupButton = popupEditProfile.querySelector('#pop-up-edit-profile-close');
const nameEditButton = document.querySelector('.profile__button-edit');
const popupEditForm = popupEditProfile.querySelector('.pop-up__form');
const nameForm = popupEditForm.querySelector('#name');
const statusForm = popupEditForm.querySelector('#hobby');
const profileInfo = document.querySelector('.profile__info');
const nameInfo = profileInfo.querySelector('.profile__name');
const statusInfo = profileInfo.querySelector('.profile__status');

const popupEditPicture = document.querySelector('#pop-up-edit-picture');
const addPictureButon = document.querySelector('.profile__button-add');

const editFormPicture = document.querySelector('#edit-form-picture');


const closePopupEditButton = document.querySelector('#pop-up-edit-picture-close');

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

function closePopup(evt){
  const targetId = evt.target.id;
  if (targetId === 'pop-up-edit-profile-close'){
    popupEditProfile.classList.remove('pop-up_opened');
  } 
  else if (targetId === 'pop-up-edit-picture-close'){
    popupEditPicture.classList.remove('pop-up_opened');
  }
  else if (targetId === 'picture__button-close'){
    const picture = document.querySelector('.picture');
    picture.remove();
  }
};

function clearAddPicture(){
  editFormPicture.querySelector('#picture').value = null;
  editFormPicture.querySelector('#url').value = null;
}
  

function openPopup(evt){
  const targetId = evt.target.id;
  if (targetId === 'profile__button-edit'){
    popupEditProfile.classList.toggle('pop-up_opened');
    nameForm.value = nameInfo.textContent;
    statusForm.value = statusInfo.textContent;
  } 
  else if (targetId === 'profile__button-add'){
    popupEditPicture.classList.toggle('pop-up_opened');
    clearAddPicture();
  }
  
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInfo.textContent = nameForm.value;
    statusInfo.textContent = statusForm.value;
    popupEditProfile.classList.remove('pop-up_opened');
}

function setLike(evt){
    evt.target.classList.toggle('table__button-like_active');
}

function removeCard(evt){
  evt.target.parentElement.remove();
}

function openPicture(evt){
  const page = document.querySelector('.page');
  const template = document.querySelector('#template-picture').content;
  const picture = template.querySelector('.picture').cloneNode(true);
  picture.querySelector('.picture__image').src = evt.target.src;
  picture.querySelector('.picture__description').textContent = evt.target.alt;

  const closeButton = picture.querySelector('#picture__button-close');
  closeButton.addEventListener('click', closePopup);

  picture.classList.add('picture_opened');

  page.append(picture);

}

function addCard(name, link, before){
  const table = document.querySelector('.table');
  const template = document.querySelector('#template-card').content;
  const card = template.querySelector('.table__card').cloneNode(true);
  card.querySelector('.table__photo').src = link;
  card.querySelector('.table__photo').alt = name;
  card.querySelector('.table__name').textContent = name;

  const likeButton = card.querySelector('.table__button-like');
  likeButton.addEventListener('click', setLike);

  const removeButton = card.querySelector('.table__button-remove');
  removeButton.addEventListener('click', removeCard);

  card.querySelector('.table__photo').addEventListener('click', openPicture);

  before ? table.append(card) : table.prepend(card);
}

function savePicture(evt){
  evt.preventDefault();
  const namePictureForm = editFormPicture.querySelector('#picture').value;
  const urlPictureForm = editFormPicture.querySelector('#url').value;
  if (namePictureForm && urlPictureForm){
    addCard(namePictureForm,urlPictureForm, false);
  } else{
    alert('Не введенны данные');
  }
  clearAddPicture();
  popupEditPicture.classList.toggle('pop-up_opened');
}


closePopupButton.addEventListener('click', closePopup);
closePopupEditButton.addEventListener('click', closePopup);
nameEditButton.addEventListener('click', openPopup);
addPictureButon.addEventListener('click', openPopup);
popupEditForm.addEventListener('submit', formSubmitHandler);
editFormPicture.addEventListener('submit', savePicture);
initialCards.forEach(x=>{
  addCard(x.name, x.link, true);
});
