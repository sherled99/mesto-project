import "./index.css";
import {
    nameEditButton,
    buttonAddPicture,
    avatarInfo,
    cardList,
    validationConfig,
    connection,
} from "../scripts/utils/const.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Api from "../scripts/components/Api.js";
import Card from "../scripts/components/Card.js";
import Render from "../scripts/components/Render.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithoutForm from "../scripts/components/PopupWithoutForm";
import UserInfo from "../scripts/components/UserInfo";
import Section from "../scripts/components/Section";

const render = new Render();
const porfileValidator = new FormValidator(
    { settings: validationConfig },
    "#edit-form-profile"
);
const cardValidator = new FormValidator(
    { settings: validationConfig },
    "#edit-form-picture"
);
const avatarValidator = new FormValidator(
    { settings: validationConfig },
    "#edit-form-avatar"
);

const section = new Section(".table");

let userId;

const api = new Api({ connection });
const standartUserData = api.getProfile();
const standartCards = api.getCards();

const userInfo = new UserInfo({
    data: {
        selectorPorfile: ".profile",
        selectorName: ".profile__name",
        selectorStatus: ".profile__status",
        selectorAvatar: ".profile__avatar",
    },
});

const setStandartCards = (cards) => {
    return cards.forEach((res) => {
        const card = createCard(res);
        const cardElement = card.createCard();
        section.addItem(cardElement);
    });
};

const createCard = (res) => {
    const card = new Card(
        {
            data: res,
            handleClick: (photo) => {
                photo.addEventListener("click", () => {
                    const popupWithImage = new PopupWithImage(
                        `.picture`,
                        "#name",
                        "#description"
                    );
                    popupWithImage.open(res.link, res.name);
                });
            },
            openRemoveCard: (evt) => {
                const popupWithoutForm = new PopupWithoutForm(
                    {
                        deleteCard: (btn, popup) => {
                            render.renderDeleting(btn, true);
                            return api
                                .removeCard(popup.id)
                                .then(() => {
                                    card.remove();
                                })
                                .catch((err) => console.log(err))
                                .finally(() => {
                                    render.renderDeleting(btn, false);
                                    popupWithoutForm.close();
                                });
                        },
                    },
                    ".pop-up-delete-picture"
                );
                popupWithoutForm.open(evt);
            },
            updateLike: (evt) => {
                const method = !evt.target.classList.contains("table__button-like_active") ? "PUT" : "DELETE";
                const like = evt.target.parentElement.querySelector(".table__like");
                return api
                    .updateLike(method, like.id)
                    .then((res) => {
                      evt.target.classList.toggle("table__button-like_active");
                      like.textContent = res.likes.length;
                  })
                  .catch((err) => console.log(err));




            },
        },
        ".table__card",
        userId
    );

    return card;
};

Promise.all([standartUserData, standartCards]).then((values) => {
    userId = values[0]._id;
    setStandartCards(values[1]);
    userInfo.setUserInfo(values[0]);

    const popupProfile = new PopupWithForm(
        {
            collection: {
                ".profile__name": "#name",
                ".profile__status": "#description",
            },
            submit: (values, evt) => {
                saveProfile(evt, values);
            },
        },
        "#pop-up-edit-profile"
    );

    const popupNewPicture = new PopupWithForm(
        {
            collection: {
                first: "#name",
                second: "#description",
            },
            submit: (values, evt) => {
                savePicture(evt, values);
            },
        },
        "#pop-up-edit-picture"
    );

    const popupAvatar = new PopupWithForm(
        {
            collection: {
                first: "#name",
            },
            submit: (values, evt) => {
                updateAvatar(evt, values);
            },
        },
        "#pop-up-edit-avatar"
    );

    const saveProfile = (evt, values) => {
        evt.preventDefault();
        const btn = evt.target.querySelector(".pop-up__button-save");
        render.renderLoading(btn, true);
        api.saveProfile(values[0], values[1])
            .then((res) => {
                userInfo.setUserInfo(res);
                popupProfile.close();
            })
            .catch((err) => console.log(err))
            .finally(() => render.renderLoading(btn, false));
    };

    const savePicture = (evt, values) => {
        evt.preventDefault();
        const btn = evt.target.querySelector(".pop-up__button-save");
        render.renderLoading(btn, true);
        api.addCard({
            name: values[0],
            link: values[1],
        })
            .then((res) => {
                const card = createCard(res);
                const cardElement = card.createCard();
                cardList.prepend(cardElement);
            })
            .then(() => {
                popupNewPicture.close("", "");
            })
            .catch((err) => console.log(err))
            .finally(() => render.renderLoading(btn, false));
    };

    const updateAvatar = (evt, values) => {
        evt.preventDefault();
        const btn = evt.target.querySelector(".pop-up__button-save");
        render.renderLoading(btn, true);
        api.updateAvatar(values[0])
            .then((res) => {
                userInfo.setUserInfo(res);
                popupAvatar.close();
                render.renderLoading(btn, false);
            })
            .catch((err) => console.log(err))
            .finally(() => render.renderLoading(btn, false));
    };

    nameEditButton.addEventListener("click", () => {
        popupProfile.open();
        porfileValidator.clearInputError();
    });
    buttonAddPicture.addEventListener("click", () => {
        popupNewPicture.open();
        cardValidator.clearInputError();
    });
    avatarInfo.addEventListener("click", () => {
        popupAvatar.open();
        avatarValidator.clearInputError();
    });

    porfileValidator.enableValidation();
    avatarValidator.enableValidation();
    cardValidator.enableValidation();
});
