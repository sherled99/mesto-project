export const nameEditButton = document.querySelector(".profile__button-edit");
export const avatarInfo = document.querySelector(".profile__avatar");
export const buttonAddPicture = document.querySelector(".profile__button-add");
export const validationConfig = {
    inputSelector: ".pop-up__text",
    submitButtonSelector: ".pop-up__button-save",
    inputInvalid: "pop-up__text_invalid",
    inactiveButtonClass: "pop-up__button_save_type-inactive",
    errorClass: "pop-up__text-error",
};
export const connection = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-18/",
    headers: {
        authorization: "f09ceac6-9112-495c-a20a-3317fc6c1cea",
        "Content-Type": "application/json",
    },
};
