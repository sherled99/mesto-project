export const popupEditProfile = document.querySelector("#pop-up-edit-profile");
export const popupUpdateAvatar = document.querySelector("#pop-up-edit-avatar");
export const avatarForm = document.querySelector("#edit-form-avatar");
export const popupDeletePicture = document.querySelector("#pop-up-delete-picture");
export const pictureDeleteForm = document.querySelector("#edit-form-avatar");
export const nameEditButton = document.querySelector(".profile__button-edit");
export const popupEditForm = popupEditProfile.querySelector(".pop-up__form");
export const nameForm = popupEditForm.querySelector("#name");
export const hobbyForm = popupEditForm.querySelector("#description");
export const profileInfo = document.querySelector(".profile");
export const nameInfo = profileInfo.querySelector(".profile__name");
export const hobbyInfo = profileInfo.querySelector(".profile__status");
export const avatarInfo = profileInfo.querySelector(".profile__avatar");
export const cardList = document.querySelector(".table");
export const template = document.querySelector("#template-card").content;
export const popupEditPicture = document.querySelector("#pop-up-edit-picture");
export const buttonAddPicture = document.querySelector(".profile__button-add");
export const pictureFormEdit = document.querySelector("#edit-form-picture");
export const picture = document.querySelector(".picture");
export const nameProfile = popupEditProfile.querySelector("#name");
export const descProfile = popupEditProfile.querySelector("#description");
export const namePicEdit = popupEditPicture.querySelector("#name");
export const descPicEdit = popupEditPicture.querySelector("#description");
export const picName = picture.querySelector("#name");
export const descName = picture.querySelector("#description");
export const pictureFormEditName = pictureFormEdit.querySelector("#name");
export const pictureFormEditDesc = pictureFormEdit.querySelector("#description");
export const formUrl = avatarForm.querySelector('#url');
export const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__text',
    submitButtonSelector: '.pop-up__button-save',
    inputInvalid: 'pop-up__text_invalid',
    inactiveButtonClass: 'pop-up__button_save_type-inactive',
    errorClass: 'pop-up__text-error'
  }
