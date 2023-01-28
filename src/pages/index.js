import "./index.css";
import {
    nameEditButton,
    buttonAddPicture,
    avatarInfo,
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

const popupWithImage = new PopupWithImage(
    `.picture`,
    "#name",
    "#description"
);

const popupWithoutForm = new PopupWithoutForm(
    {
        deleteCard: (btn, popup) => {
            render.renderDeleting(btn, true);
            return api
                .removeCard(popup.id)
                .then(() => {
                    popupWithoutForm.card.remove();
                    popupWithoutForm.close();
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    render.renderDeleting(btn, false);
                });
        },
    },
    ".pop-up-delete-picture"
);

const section = new Section({ 
    renderer: (item) => {
        const card = createCard(item);
        const cardElement = card.createCard();
        section.addItem(cardElement, true);
    }},".table");

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
    }
});

const createCard = (res) => {
    const card = new Card(
        {
            data: res,
            handleClick: () => {
                popupWithImage.open(res.link, res.name);
            },
            openRemoveCard: (evt) => {
                popupWithoutForm.open(evt, card);
            },
            updateLike: (evt) => {
                const method = !evt.target.classList.contains("table__button-like_active") ? "PUT" : "DELETE";
                const like = evt.target.parentElement.querySelector(".table__like");
                return api
                    .updateLike(method, like.id)
                    .then((res) => {
                        card.setCountLike(res.likes.length);
                  })
                  .catch((err) => console.log(err));
            },
        },
        ".table__card",
        userId
    );

    return card;
};

const saveProfile = (evt, values) => {
    const btn = evt.target.querySelector(".pop-up__button-save");
    render.renderLoading(btn, true);
    api.saveProfile(values[0], values[1])
        .then((res) => {
            popupProfile.close();
            userInfo.setUserInfo(res);
        })
        .catch((err) => console.log(err))
        .finally(() => render.renderLoading(btn, false));
};

const popupProfile = new PopupWithForm(
    {
        submit: (evt, values) => {
            saveProfile(evt, values);
        },
    },
    "#pop-up-edit-profile"
);

const popupNewPicture = new PopupWithForm(
    {
        submit: (evt, values) => {
            savePicture(evt, values);
        },
    },
    "#pop-up-edit-picture"
);

const popupAvatar = new PopupWithForm(
    {
        submit: (evt, values) => {
            updateAvatar(evt, values);
        },
    },
    "#pop-up-edit-avatar"
);

const updateAvatar = (evt, values) => {
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

const savePicture = (evt, values) => {
    const btn = evt.target.querySelector(".pop-up__button-save");
    render.renderLoading(btn, true);
    api.addCard({
        name: values[0],
        link: values[1],
    })
        .then((res) => {
            const card = createCard(res);
            const cardElement = card.createCard();
            section.addItem(cardElement, false);
        })
        .then(() => {
            popupNewPicture.close("", "");
        })
        .catch((err) => console.log(err))
        .finally(() => render.renderLoading(btn, false));
};

nameEditButton.addEventListener("click", () => {
    popupProfile.open();
    popupProfile.setStandartValues([document.querySelector('.profile__name').textContent, document.querySelector('.profile__status').textContent]);
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

Promise.all([standartUserData, standartCards]).then((values) => {
    userId = values[0]._id;
    userInfo.setUserInfo(values[0]);
    section.items = values[1];
    section.renderItems();
});
