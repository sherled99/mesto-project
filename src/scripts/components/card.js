import {connection } from "./const.js";
import Api from "./Api.js"
const api = new Api({connection});

export default class Card{
  constructor({data, handleClick, openRemoveCard, addCard}, selector, userId){
    if (data){
      this._ownerId = data.owner._id;
      this.id = data._id;
      this._link = data.link;
      this._name = data.name;
      this._likes = data.likes;
      this._userId = userId;
      this._addCard = addCard;
    }
    
    this._openRemoveCard = openRemoveCard;
    this._selector = selector;
    this._handleClick = handleClick;
  }

  createCard = () => {
    const template = document.querySelector("#template-card").content
    this.cardElement = template.querySelector(this._selector).cloneNode(true);
    this.cardElement.id = this.id;
    this.cardElement.classList.add(`card${this.id}`);
    this.cardElement.querySelector(".table__name").textContent = this._name;
    this._createCardLike();
    this._createCardValues();
    this._createCardDelete();

    return this.cardElement;
  }

  _createCardValues = () => {
    const photo = this.cardElement.querySelector(".table__photo");
    photo.src = this._link;
    photo.alt = this._name;
    this._handleClick(photo);
  }

  _createCardLike = () => {
    const like = this.cardElement.querySelector(".table__like");
    like.id = this.id;
    like.textContent = this._likes.length;
    const likeButton = this.cardElement.querySelector(".table__button-like");
    if (this._likes.some(x => x._id === this._ownerId)) likeButton.classList.add("table__button-like_active");
    likeButton.addEventListener("click", this._setLike);
  }

  _setLike = (evt) => {
    const like = evt.target.parentElement.querySelector(".table__like");
    if (!evt.target.classList.contains("table__button-like_active")) {
      this._updateLike("PUT", like);
    } else {
      this._updateLike("DELETE", like);
    }
    evt.target.classList.toggle("table__button-like_active");
  }

  _updateLike = (method, like) => {
    api.updateLike(method, like.id)
      .then((res) => {
        like.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  }

  _createCardDelete = () => {
    const btnDelete = this.cardElement.querySelector(".table__button-remove");
    btnDelete.addEventListener("click", this._openRemoveCard);
    if (this._userId === this._ownerId)
      btnDelete.classList.add("table__button-remove_active");
  }

}
