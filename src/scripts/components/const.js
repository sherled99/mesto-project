export const popupEditProfile = document.querySelector("#pop-up-edit-profile");
export const avatarForm = document.querySelector("#edit-form-avatar");
export const nameEditButton = document.querySelector(".profile__button-edit");
export const popupEditForm = popupEditProfile.querySelector(".pop-up__form");
export const profileInfo = document.querySelector(".profile");
export const nameInfo = profileInfo.querySelector(".profile__name");
export const hobbyInfo = profileInfo.querySelector(".profile__status");
export const avatarInfo = profileInfo.querySelector(".profile__avatar");
export const cardList = document.querySelector(".table");
export const buttonAddPicture = document.querySelector(".profile__button-add");
export const pictureFormEdit = document.querySelector("#edit-form-picture");
export const picture = document.querySelector(".picture");
export const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__text',
    submitButtonSelector: '.pop-up__button-save',
    inputInvalid: 'pop-up__text_invalid',
    inactiveButtonClass: 'pop-up__button_save_type-inactive',
    errorClass: 'pop-up__text-error'
  }
export const connection = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-18/",
  headers: {
    authorization: "f09ceac6-9112-495c-a20a-3317fc6c1cea",
    "Content-Type": "application/json",
  }
}
