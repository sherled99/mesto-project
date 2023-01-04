import { cardList, template, picture, popupDeletePicture, connection } from "./const.js";
import { openPopup, closePopup } from "./modal.js";
import { setDefaultValuesInCard, userId } from "../../pages/index.js";
import Api from "./Api.js"
import { renderDeleting } from "./utils.js";

const api = new Api({connection});

function openRemoveCard(evt) {
  openPopup(popupDeletePicture);
  popupDeletePicture.id = evt.target.parentElement.id;
  popupDeletePicture.card = evt.target.closest(".table__card");
  popupDeletePicture.addEventListener("submit", removeCard);
}

function updateLike(method, like) {
  api.updateLike(method, like.id)
    .then((res) => {
      like.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
}

export function addCard(card) {
  return api.addCard(card)
    .then((res) =>
      cardList.prepend(
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

function removeCard(currentEvt) {
  currentEvt.preventDefault();
  const btn = currentEvt.target.querySelector(".pop-up__button-save");
  renderDeleting(btn, true);
  return api.removeCard(popupDeletePicture.id)
    .then(() => {
      popupDeletePicture.card.remove();
      closePopup(popupDeletePicture);
      popupDeletePicture.removeEventListener("submit", removeCard);
    })
    .catch((err) => console.log(err))
    .finally(() => renderDeleting(btn, false));
}

function setLike(evt) {
  const like = evt.target.parentElement.querySelector(".table__like");
  if (!evt.target.classList.contains("table__button-like_active")) {
    updateLike("PUT", like);
  } else {
    updateLike("DELETE", like);
  }
  evt.target.classList.toggle("table__button-like_active");
}

export function createCard(ownerId, id, name, link, likes, isLike) {
  const cardElement = template.querySelector(".table__card").cloneNode(true);
  cardElement.id = id;
  const photo = cardElement.querySelector(".table__photo");
  const like = cardElement.querySelector(".table__like");
  photo.src = link;
  photo.alt = name;
  like.textContent = likes.length;
  like.id = id;
  cardElement.querySelector(".table__name").textContent = name;
  const likeButton = cardElement.querySelector(".table__button-like");
  if (isLike) likeButton.classList.add("table__button-like_active");
  likeButton.addEventListener("click", setLike);
  const btnDelete = cardElement.querySelector(".table__button-remove");
  btnDelete.addEventListener("click", openRemoveCard);
  if (userId === ownerId)
    btnDelete.classList.add("table__button-remove_active");
  photo.addEventListener("click", () => {
    openPopup(picture);
    setDefaultValuesInCard(link, name);
  });
  return cardElement;
}
