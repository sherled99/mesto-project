export default class Card {
    constructor(
        { data, handleClick, openRemoveCard, updateLike },
        selector,
        userId
    ) {
        if (data) {
            this._ownerId = data.owner._id;
            this.id = data._id;
            this._link = data.link;
            this._name = data.name;
            this._likes = data.likes;
            this._userId = userId;
        }

        this._openRemoveCard = openRemoveCard;
        this._selector = selector;
        this._handleClick = handleClick;
        this._updateLike = updateLike;
    }

    createCard = () => {
        const template = document.querySelector("#template-card").content;
        this.cardElement = template
            .querySelector(this._selector)
            .cloneNode(true);
        this.cardElement.id = this.id;
        this.cardElement.classList.add(`card${this.id}`);
        this.cardElement.querySelector(".table__name").textContent = this._name;
        this._createCardLike();
        this._setValuesInCard();
        this._createCardDelete();

        return this.cardElement;
    };

    setCountLike = (likes) => {
        this._like.textContent = likes;
        this._likeButton.classList.toggle("table__button-like_active");
    }

    remove = () => {
        this.cardElement.remove();
    };

    _setValuesInCard = () => {
        const photo = this.cardElement.querySelector(".table__photo");
        photo.src = this._link;
        photo.alt = this._name;
        photo.addEventListener("click", this._handleClick);
    };

    _createCardLike = () => {
        this._like = this.cardElement.querySelector(".table__like");
        this._like.id = this.id;
        this._like.textContent = this._likes.length;
        this._likeButton = this.cardElement.querySelector(
            ".table__button-like"
        );
        if (this._likes.some((x) => x._id === this._userId))
            this._likeButton.classList.add("table__button-like_active");
        this._likeButton.addEventListener("click", this._handleUpdateLike);
    };

    _handleUpdateLike = () => {
        const method = !this._likeButton.classList.contains("table__button-like_active") ? "PUT" : "DELETE";
        const like = this._likeButton.parentElement.querySelector(".table__like");
        this._updateLike(method, like.id);
    }

    _createCardDelete = () => {
        const btnDelete = this.cardElement.querySelector(
            ".table__button-remove"
        );
        btnDelete.addEventListener("click", this._openRemoveCard);
        if (this._userId === this._ownerId)
            btnDelete.classList.add("table__button-remove_active");
    };
}
